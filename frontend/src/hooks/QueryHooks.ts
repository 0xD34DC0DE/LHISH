import {Dispatch, SetStateAction, useContext, useState} from "react";
import axios from "axios";
import SessionContext from "../contexts/SessionContext";

interface APIError {
    error?: string
}

type ValueType = Exclude<any, Function & File>

function isFunction(object: any) {
    return typeof object === "function";
}

const callGetters = (records: [string, ValueType | Function][]) => {
    return records.reduce((object, record) =>
        Object.assign(object, {
            [record[0]]: isFunction(record[1]) ? record[1]() : record[1]
        }), {});
}

const toFormData = (formData: ([string, ValueType | Function | File])[]) => {
    return formData.reduce((formatData, value) => {
        if (value[1] && !(value[1] instanceof File))
            formatData.append(value[0], value[1])
        else
            formatData.append(value[0], isFunction(value[1]) ? value[1]() : value[1])
        return formatData;
    }, new FormData());
}

export const useGet = <R>(url: string, headers: [string, ValueType | Function][] = []):
    [
        (...params: [string, ValueType | Function][]) => void,
            R | null,
            string | null,
        () => void
    ] => {
    const [data, setData] = useState<R | null>(null);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setData(null);
        setError(null)
    }

    const get = (...params: [string, ValueType | Function][]) =>
        axios.get<R & APIError>(url, {
            params: callGetters(params),
            headers: callGetters(headers)
        })
            .then(value => {
                if (value.data.error) {
                    setData(null);
                    setError(value.data.error);
                } else {
                    setData(value.data);
                    setError(null);
                }
            })
            .catch(reason => {
                console.error(reason)
                setError(reason);
                setData(null);
            });

    return [get, data, error, reset];
}

const callOnStatus = (setError: Dispatch<SetStateAction<string | null>>,
                      status: number, onStatusCallbacks: [number | number[],
        ((setError: Dispatch<SetStateAction<string | null>>) => void)][]): boolean => {
    let hasHandledStatus = false;
    for (const statusCallback of onStatusCallbacks) {
        if (typeof statusCallback[0] === "object" && statusCallback[0].indexOf(status) !== -1) {
            statusCallback[1](setError);
            hasHandledStatus = true;
            continue;
        }
        if (statusCallback[0] === status) {
            statusCallback[1](setError);
            hasHandledStatus = true;
        }
    }
    return hasHandledStatus;
}

//TODO use object instead of arguments
export const usePost = <R>(url: string,
                           headers: [string, ValueType | Function][] = [],
                           onStatus: [number | number[], ((setError: Dispatch<SetStateAction<string | null>>) => void)][] = []):
    [
        (...body: [string, ValueType | Function][]) => void,
            R | null,
            string | null,
        () => void
    ] => {
    const [data, setData] = useState<R | null>(null);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setData(null);
        setError(null)
    }

    const post = (...body: [string, ValueType | Function][]) => {
        axios.post<R & APIError>(url,
            {...callGetters(body)},
            {
                headers: callGetters(headers),
                validateStatus: status => status > 500
            })
            .then(value => {
                if (value.data.error) {
                    setData(null);
                    setError(value.data.error);
                } else {
                    setData(value.data);
                    setError(null);
                }
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
                setData(null);
            });
    };

    return [post, data, error, reset];
}

export const useFormPost = <R = APIError>(url: string,
                               headers: [string, ValueType | Function][] = [],
                               onStatus: [number | number[], ((setError: Dispatch<SetStateAction<string | null>>) => void)][] = []):
    [
        (...body: [string, ValueType | Function | File][]) => void,
            R | null,
            string | null,
        () => void
    ] => {
    const [data, setData] = useState<R | null>(null);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setData(null);
        setError(null)
    }

    const postForm = (...body: [string, ValueType | Function | File][]) => {
        axios.post<R & APIError>(url,
            toFormData(body),
            {
                headers: callGetters(headers),
            })
            .then(value => {
                if (value.data.error) {
                    setData(null);
                    setError(value.data.error);
                } else {
                    setData(value.data);
                    setError(null);
                }
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
                setData(null);
            });
    };

    return [postForm, data, error, reset];
}

export const useAuthPost = <R>(url: string,
                               headers: [string, ValueType | Function][] = [],
                               onStatus: [number | number[], ((setError: Dispatch<SetStateAction<string | null>>) => void)][] = []) => {
    const {session} = useContext(SessionContext);
    return usePost<R>(url, [['Authorization', `Bearer ${session.token}`], ...headers], onStatus);
}

export const useAuthFormPost = <R>(url: string,
                                   headers: [string, ValueType | Function][] = [],
                                   onStatus: [number | number[], ((setError: Dispatch<SetStateAction<string | null>>) => void)][] = []) => {
    const {session} = useContext(SessionContext);
    return useFormPost<R>(
        url,
        [
            ['Authorization', `Bearer ${session.token}`],
            ["Content-Type", "multipart/form-data"],
            ...headers
        ],
        onStatus
    );
}

//TODO use error setter instead of returning error state

export const useAuthGet = <R>(url: string, headers: [string, ValueType | Function][] = []) => {
    const {session} = useContext(SessionContext);
    return useGet<R>(url, [['Authorization', `Bearer ${session.token}`], ...headers]);
}