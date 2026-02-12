import { useState } from 'react';

const useForm = (initialValues: any) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return {
        values,
        handleChange,
    };
};

export default useForm;
