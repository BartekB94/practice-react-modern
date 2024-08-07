/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useState } from 'react';
import fields from './fields';

const style = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
};

// nie moge skonfigurowac EmailJS na stronie. Caly czas dostaje jakies bledy
function ContactForm() {
    const init = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        description: '',
    };

    const reducer = (state, { name, value }) => ({ ...state, [name]: value });
    const [state, dispatch] = useReducer(reducer, init);
    const [errors, setErrors] = useState([]);

    const validateInput = (value, pattern) => {
        if (pattern) {
            const regex = new RegExp(pattern);
            return regex.test(value);
        }
        return true;
    };

    // prettier i eslint uniemozliwia mi walidacje email psujac pattern i walidacja nigdy nie przechodzi ".prettierignore" nie pomaga
    const validateForm = () => {
        const newErrors = [];
        fields.forEach((field) => {
            if (!state[field.name]) {
                newErrors.push(`${field.label} is required`);
            } else if (field.pattern && !validateInput(state[field.name], field.pattern)) {
                newErrors.push(`${field.label} is invalid`);
            }
        });
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            Object.keys(init).forEach((key) => dispatch({ name: key, value: '' }));
        }
    };

    return (
        <>
            <form style={style} onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <label key={index}>
                        {field.label}
                        {field.htmlEl ? (
                            <textarea
                                name={field.name}
                                onChange={(e) => dispatch(e.target)}
                                value={state[field.name]}
                                pattern={field.pattern}
                            />
                        ) : (
                            <input
                                name={field.name}
                                onChange={(e) => dispatch(e.target)}
                                value={state[field.name]}
                            />
                        )}
                    </label>
                ))}
                <input type="submit" />
            </form>
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </>
    );
}

export default ContactForm;
