import {useState} from "react";


export const useValidation = (validator: () => string | null):
    [
        (skipMessage?: boolean) => boolean,
        {
            onFocus: () => void,
            error: boolean,
            helperText: string
        }
    ] => {
    const [error, setError] = useState<string | null>(null);

    const validate = (skipErrorMessage: boolean = false) => {
        let error = validator();
        if (!skipErrorMessage) {
            setError(error);
        }
        return error === null;
    };

    return [
        validate,
        {
            onFocus: () => setError(null),
            error: (error !== null),
            helperText: error ?? ""
        }
    ]
}