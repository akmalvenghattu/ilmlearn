import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ValidationErrors from 'components/CustomComponents/ValidationErrors';
import TextInput from 'components/CustomComponents/TextInput';
import CustomButton from 'components/CustomComponents/CustomButton';

import AppContext from 'server_api/context/AppContext';
import { storeData } from 'server_api/storage';

const Login = () => {
    const { allUsers } = useContext(AppContext);
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState("");

    const validationSchema = Yup.object({
        userName: Yup.string().min(4, 'User name must be at least 4 characters').required('User name is required'),
        password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("values", allUsers);
            setErrorMessages('');
            if (allUsers?.length > 0) {
                const userIsAvailableData = allUsers.find(user => ((user.userName === values.userName) || (user.email === values.userName)) && (user.password === values.password));
                if (userIsAvailableData) {
                    if (userIsAvailableData.userType === 'iLMUser') {
                        storeData('ilm_userLoggedData', userIsAvailableData);
                        navigate('/')
                    } else if (userIsAvailableData.userType === 'iLMAdmin') {
                        storeData('ilm_userLoggedData', userIsAvailableData);
                        navigate('/')
                    } else {
                        setErrorMessages('This user not found!');
                    }
                } else {
                    setErrorMessages('Invalid user name or password!');
                }
            } else {
                alert("he")
                setErrorMessages('Invalid user name or password!');
            }
        },
    });

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-[#2f5d18] text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                            Sign in / Register
                        </h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="space-y-4 ">
                                <div>
                                    <TextInput
                                        labelText="Your User Name"
                                        placeholder="please enter your user name"
                                        id="userName"
                                        name="userName"
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessages={formik.touched.userName && formik.errors.userName && formik.errors.userName || ""}
                                        autoFocus={true}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        labelText="Your Password"
                                        placeholder="please enter your password"
                                        id="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessages={formik.touched.password && formik.errors.password && formik.errors.password || ""}
                                    />
                                    <ValidationErrors errorMessages={errorMessages} />
                                </div>

                                <div className="flex flex-col md:flex-row gap-2 pt-3">
                                    {/* <button type="submit" className="flex justify-center w-full text-white bg-[#609a42] hover:bg-[#467c2a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Login
                                    </button> */}
                                    <CustomButton
                                        buttonText="Login"
                                        type="submit"
                                    />
                                    <Link to="/register" >
                                        <a className="flex justify-center w-full text-white bg-[#609a42] hover:bg-[#467c2a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Register
                                        </a>
                                    </Link>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login

