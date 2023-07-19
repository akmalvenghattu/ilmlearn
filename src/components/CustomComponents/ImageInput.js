import { FaFileUpload } from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';

export const ImageInput = ({
    label = '',
    className = '',
    name = 'noname',
    disabled = false,
    onCancel = false,
    src = '',
    onChange = (e) => { },
}) => {
    
    return (
        <div
            className={` ${className}`}>
            <div className="form-label mb-2 text-white">{label}</div>
            <div className="group flex w-full h-32 bg-white  text-gary-700 rounded-md border border-solid border-gray-300  py-1 flex-col justify-center items-center cursor-pointer relative">
                {!src && !disabled && (
                    <>
                        <FaFileUpload className="stroke-current text-gray-400" size={22} />
                        <span className="text-center text-xs mt-2">
                            Drag Your Files Here
                            <br /> or
                            <br /> Click to Upload
                        </span>
                    </>
                )}
                {src && (
                    <>
                        <div className={`rounded w-full h-full cursor-pointer relative`}>
                            <img
                                src={src}
                                alt="media"
                            />
                        </div>
                        <FaFileUpload
                            className="stroke-current text-gray-300 cursor-pointer absolute left-1 top-1 group-hover:text-gray-900"
                            size={22}
                        />
                    </>
                )}
                {!disabled && (
                    <>
                        <input
                            type="file"
                            name={name}
                            className="absolute w-full h-full  opacity-0 cursor-pointer"
                            onChange={onChange}
                        />
                        {onCancel !== false && (
                            <button
                                className="btn btn-default btn-rounded btn-icon bg-transparent hover:bg-blue-50 text-red-500 hover:text-red-700 btn-raised absolute top-1 right-1"
                                onClick={onCancel}>
                                <FiXCircle className="stroke-current" size={16} />
                            </button>
                        )}
                    </>
                )}
                {disabled && !src && (
                    <span className="text-center text-xs mt-2 text-red-300">
                        No Files Uploaded
                    </span>
                )}
            </div>
        </div>
    );
};