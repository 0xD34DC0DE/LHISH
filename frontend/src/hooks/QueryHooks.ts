import {useState} from "react";
import axios from "axios";

interface Error {
    error: string
}

export const useGet = <R extends Error, >(url: string, ...params: [Record<string, string | (() => string)>]) => {
    const [data, setData] = useState<R>();
    const [error, setError] = useState("");

    const reset = () => {
        setData(undefined);
        setError("")
    }

    const get = () => axios.get<R>(url)
        .then(value => {
            if (value.data.error) {
                setError(value.data.error);
            } else {
                setData(value.data);
            }
        })
        .catch(reason => {
            console.error(reason)
            setError(reason);
        });

    return [get, data, error, reset];
}

type ValueType = Exclude<any, Function>

export const usePost = <R extends Error, >(url: string, ...headers: [string, ValueType | Function][]) => {
    const [data, setData] = useState<R>();
    const [error, setError] = useState("");

    const reset = () => {
        setData(undefined);
        setError("")
    }

    const callGetters = (records: [string, ValueType | Function][]) => {
        return records.reduce((object, record) => {
            if (typeof record[1] === "function") {
                console.log(record[0], "is a function that returns", record[1]())
                return Object.assign(object, {[record[0]]: record[1]()})
            } else {
                console.log(record[0], record[1]);
                return Object.assign(object, {[record[0]]: record[1]})
            }
        }, {});
    }

    const post = (...body: [string, ValueType | Function][]) => {
        callGetters(body);
        axios.post<R>(url,{ ...callGetters(body)})
            .then(value => {
                if (value.data.error) {
                    setError(value.data.error);
                } else {
                    setData(value.data);
                }
            })
            .catch(reason => {
                console.error(reason)
                setError(reason);
            })
    };

    return [post, data, error, reset];
}