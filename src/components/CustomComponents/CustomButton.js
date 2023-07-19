import React from 'react';

const CustomButton = (props) => {

    const {
        buttonText,
        btnClassName = '',
        className = '',
        type,
        onClick = (e) => { },
    } = props;

    return (
        <div className={`flex w-full ${className}`}>
            <button
                type={type}
                className={`${btnClassName} flex justify-center w-full text-white bg-[#609a42] hover:bg-[#467c2a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                onClick={onClick}
            >
                {buttonText}
            </button>
        </div>
    );
}

export default CustomButton;