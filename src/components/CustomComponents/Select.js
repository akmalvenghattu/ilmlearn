import { useEffect, useRef } from "react";
import ReactSelect from 'react-select/creatable';

import ValidationErrors from "./ValidationErrors";

export const Select = ({
    label = '',
    className = '',
    extraClassName = '',
    name = '',
    placeholder = false,
    placeholderValue = "",
    items = [],
    disabled = false,
    value = false,
    onChange = (e) => { },
    autoFocus = false,
    isClearable = false,
    isSearchable = true,
    errorMessages = false,
    ...rest
}) => {
    const firstInput = useRef();
    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                firstInput.current?.focus();
            }, 100);
        }

    }, [])

    return (
        <div className={`form-element ${extraClassName} `}>
            {label && <div htmlFor="regular-form-1" className="form-label  text-white">{label}</div>}
            <ReactSelect
                ref={firstInput}
                name={name}
                className={`w-full ${className} mt-2  ${errorMessages ? "border-red-600" : " dark:border-gray-600"}`}
                onChange={onChange}
                defaultValue={items?.find(item => item.value == value)}
                placeholder={placeholder}
                options={items}
                disabled={disabled}
                autoFocus={autoFocus}
                isClearable={isClearable}
                isSearchable={isSearchable}
                showNewOptionAtTop={false}
                menuPlacement="auto"
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        text: 'orangered',
                        primary: '#609a42',
                    },
                })}
                {...rest} />
            {errorMessages && <ValidationErrors errorMessages={errorMessages} />}

        </div>
    )
}
