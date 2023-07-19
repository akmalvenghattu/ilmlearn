import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import TextInput from 'components/CustomComponents/TextInput';
import CustomButton from 'components/CustomComponents/CustomButton';
import { ImageInput } from 'components/CustomComponents/ImageInput';
import { Select } from 'components/CustomComponents/Select';
import { courses } from 'components/Data/datas';
import Loading from 'components/CustomComponents/Loading';

import AppContext from 'server_api/context/AppContext';
import { storeData, } from "server_api/storage";

const UserManage = () => {
    const { loggedUser, allUsers, setAllUsers, applications, setApplication } = useContext(AppContext);
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState({});
    const [registerationCompleted, setRegisterationCompleted] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);


    useEffect(() => {
        if (loggedUser) {
            const savedImageUrl = localStorage.getItem(loggedUser.userImageUrl);
            if (savedImageUrl) {
                setSelectedImage(savedImageUrl);
            }
        }
    }, [loggedUser]);


    useEffect(() => {
        if (registerationCompleted && selectedImage != null) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                localStorage.setItem(`userImage_${user.userId}`, imageUrl);
                sessionCompletion();
            };
            reader.readAsDataURL(selectedImage);
        } else {
            registerationCompleted && sessionCompletion();
        }
    }, [registerationCompleted, allUsers]);

    const sessionCompletion = () => {
        storeData('ilm_userLoggedData', user);
        storeData('ilm_userapplicationData', applications);
        storeData('ilm_allUsers', allUsers);
        navigate('/')
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: 'Akmal',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            // Handle form submission
            console.log(values);
        },
    });
    console.log("selectedImage", formik.values)
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 6);
    };

    let selectedCourseId = formik?.values?.courseId || null;

    useEffect(() => {
        if (selectedCourseId) {
            handle_selectedCourse();
        }
    }, [selectedCourseId]);

    const handle_selectedCourse = () => {
        if (selectedCourseId) {
            const getSelectedCourse = courses.find(course => course.courseId === formik.values.courseId)
            if (getSelectedCourse) {
                setSelectedCourse(getSelectedCourse)
            }
        }
    }

    return (
        <div className='flex flex-col bg-slate-100 justify-center items-center min-h-full	'>
            {loggedUser &&
                <>
                    <div className="w-full flex flex-col container mt-5 md:mt-24 items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
                            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-[#2f5d18] text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                                    Register
                                </h1>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-2">
                                        <TextInput
                                            classNameExtra='md:mt-4'
                                            labelText="Full Name"
                                            placeholder="please enter your full name"
                                            id="name"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            errorMessages={formik.touched.fullName && formik.errors.fullName && formik.errors.fullName || ""}
                                        />
                                        <TextInput
                                            labelText="User Name"
                                            placeholder="please enter your user name"
                                            id="userName"
                                            name="userName"
                                            value={formik.values.userName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            errorMessages={formik.touched.userName && formik.errors.userName && formik.errors.userName || ""}
                                        />
                                        <TextInput
                                            labelText="Your Email"
                                            placeholder="please enter your email"
                                            type='email'
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            errorMessages={formik.touched.email && formik.errors.email && formik.errors.email || ""}
                                        />
                                        <TextInput
                                            labelText="Phone"
                                            placeholder="please enter your phone number"
                                            type='phone'
                                            id="phone"
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            errorMessages={formik.touched.phone && formik.errors.phone && formik.errors.phone || ""}
                                        />

                                        <TextInput
                                            labelText="Password"
                                            placeholder="please enter your password"
                                            id="password"
                                            type="password"
                                            className="tracking-widest"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            errorMessages={formik.touched.password && formik.errors.password && formik.errors.password || ""}
                                        />
                                        <div className='flex flex-col space-y-2'>
                                            <label htmlFor="Date" className="form-label  text-white">
                                                Date Of Birth
                                            </label>
                                            <input
                                                className={`p-2.5 rounded-md  text-gray-800 ${formik.touched.dob && formik.errors.dob && formik.errors.dob ? "border-red-600" : " dark:border-gray-600"}`}
                                                type='date'
                                                placeholder='abcs'
                                                // value={new Date()} 
                                                id="dob"
                                                name="dob"
                                                value={formik.values.dob}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.dob && formik.errors.dob && <div className='text-red-500'>{formik.errors.dob}</div>}
                                        </div>
                                        <TextInput
                                            classNameExtra='md:mt-4'
                                            labelText="Age"
                                            placeholder="please enter age"
                                            id="age"
                                            name="age"
                                            value={formik.values.age}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <div className='flex flex-col space-y-2'>
                                            <label htmlFor="Date" className="form-label  text-white">
                                                Address
                                            </label>
                                            <textarea
                                                className={`p-2.5 rounded-md  text-gray-700 dark:border-gray-600`}
                                                placeholder="please enter your address"
                                                id="address"
                                                name="address"
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        <ImageInput
                                            label="User Display Image"
                                            name="userImage"
                                            src={
                                                (selectedImage &&
                                                    URL.createObjectURL(selectedImage))
                                                ||
                                                null
                                            }
                                            onChange={(event) => {
                                                console.log("event", event.target.files[0])
                                                setSelectedImage(event.target.files[0])
                                            }
                                            }
                                            onCancel={() =>
                                                setSelectedImage(null)
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        <div className="text-[#2f5d18] text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                                            Course Details
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-2">
                                            <div className="mt-5">
                                                <Select
                                                    label="Courses"
                                                    placeholder="--Select Course--"
                                                    name="courseId"
                                                    items={courses.map((course) => ({
                                                        value: course.courseId,
                                                        label: course.title,
                                                    }))}
                                                    value={formik.values.courseId}
                                                    onChange={(selectedOption) => {
                                                        formik.setFieldValue('courseId', selectedOption.value);
                                                        handle_selectedCourse();
                                                    }}
                                                    isSearchable
                                                    errorMessages={formik?.errors?.courseId || ""}
                                                />
                                            </div>
                                            {selectedCourse && <>
                                                <TextInput
                                                    labelText="Course Duration"
                                                    value={selectedCourse.duration}
                                                    disabled />
                                                <div className='flex flex-col space-y-2'>
                                                    <label htmlFor="Date" className="form-label  text-white">
                                                        Course Description
                                                    </label>
                                                    <textarea
                                                        className={`p-2.5 rounded-md  text-white dark:border-gray-600`}
                                                        value={selectedCourse.description}
                                                        disabled
                                                    />
                                                </div>
                                                <div className='flex flex-col space-y-2'>
                                                    <label htmlFor="Date" className="form-label  text-white">
                                                        Course Eligibility
                                                    </label>
                                                    <textarea
                                                        className={`p-2.5 rounded-md  text-white dark:border-gray-600`}
                                                        value={selectedCourse.eligibility}
                                                        disabled
                                                    />
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className='w-full flex gap-2 pt-8 sm:max-w-md flex-col md:flex-row '>
                                            <CustomButton
                                                buttonText="Register"
                                                type="submit"
                                            />
                                            <Link to="/login" >
                                                <a className="flex justify-center w-full text-white bg-[#609a42] hover:bg-[#467c2a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    Login
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
                ||
                <Loading />
            }
        </div >
    );
}

export default UserManage;