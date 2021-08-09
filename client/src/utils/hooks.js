import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    
    const [values, setvalues] = useState(initialState);
    
    const handleChange = (e) => {
        setvalues({...values , [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        callback();
    }

    return {
        handleChange,
        handleSubmit,
        values
    }

}