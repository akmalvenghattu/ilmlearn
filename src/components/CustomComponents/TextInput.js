import React, { useEffect, useRef, useState } from 'react';
import ValidationErrors from './ValidationErrors';

const TextInput = (props) => {
    const {
        htmlFor,
        labelText,
        type = 'text',
        inline = false,
        className = '',
        classNameExtra = '',
        autoComplete = 'off',
        name = 'noname',
        id = '',
        placeholder = '',
        disabled = false,
        defaultValue = '',
        value = null,
        onChange = (e) => { },
        onBlur = (e) => { },
        onKeyPress = (e) => { },
        errorMessages = false,
        autoFocus = false,
    } = props;

    const [localValue, setLocalValue] = useState(defaultValue);

    const firstInput = useRef();

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                firstInput.current?.focus();
            }, 100);
        }
    }, []);

    return (
        <div className={`${classNameExtra} space-y-2 gap-x-2 `}>
            <label htmlFor={htmlFor} className="text-sm font-medium text-gray-900 dark:text-white ">{labelText}</label>
            <input
                ref={firstInput}
                name={name}
                id={id}
                type={type}
                // dark:bg-gray-700
                className={`${className} bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5  ${errorMessages ? "border-red-600" : " dark:border-gray-600"}  dark:placeholder-gray-400 text-gray-700 `}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => {
                    setLocalValue(e.target.value);
                    onChange(e);
                }}
                onBlur={onBlur}
                onKeyPress={(e) => {
                    onKeyPress(e)
                    if (e.key === 'Enter') {
                        const form = e.target.form;
                        if (form) {
                            const index = Array.prototype.indexOf.call(form, e.target);
                            form.elements[index + 1].focus();
                            e.preventDefault();
                        }
                    }
                }}
                value={value || localValue}
                autoComplete={autoComplete}
            />
            {errorMessages && <ValidationErrors errorMessages={errorMessages} />}
        </div>
    );
}

export default TextInput;