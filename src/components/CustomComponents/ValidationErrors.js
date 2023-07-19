import React from 'react';

const ValidationErrors = ({ errorMessages }) => {
    return (
        <>
            {errorMessages !== '' && (
                <>
                    {(typeof errorMessages === 'object' &&
                        errorMessages !== null &&
                        Object.values(errorMessages).map((val, index) => (
                            <div>
                                <span className=" text-red-500 text-xs " key={index}>{val}</span>
                                <br />
                            </div>
                        ))) ||
                        <div className="mt-1 text-red-500" >{errorMessages}</div>

                    }
                </>
            )}
        </>
    );
}

export default ValidationErrors;