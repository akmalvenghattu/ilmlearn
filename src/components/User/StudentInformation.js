import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { courses } from 'components/Data/datas';
import { applicationDatas } from 'utils/constArray';
import moment from 'moment/moment';

const StudentInformation = ({ user, applications }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [applicationData, setApplicationData] = useState(null);

    useEffect(() => {
        if (user) {
            const savedImageUrl = localStorage.getItem(user.userImageUrl);
            if (savedImageUrl) {
                setImageUrl(savedImageUrl);
            }
        }
        getSelectedCourse();
        getApplicationData();
    }, [user]);

    useEffect(() => {
        applications && getApplicationData();
    }, [applications]);

    const getSelectedCourse = () => {
        const getSelectedCourse_ = courses.find(course => course.courseId === user.courseId)
        if (getSelectedCourse_) {
            setSelectedCourse(getSelectedCourse_)
        }
    }
    const getApplicationData = () => {
        const selectedCourse_ = applications?.find(application => application.userId === user.userId)
        if (selectedCourse_) {
            setApplicationData(selectedCourse_)
        }
    }

    return (
        <div className='flex flex-col w-full ' key={user}>
            <div className='flex text-2xl'><div className='text-[#609a42] hover:underline font-semibold'>{user.fullName}</div> 's informations</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-3'>
                <div className='w-full flex border border-gray-300 rounded-md '>
                    <div className=' flex flex-col p-2 border-r' >
                        <div className=" rounded-full w-24 h-24 overflow-hidden border-4 border-[#609a42] ">
                            {imageUrl && (
                                <img src={imageUrl} alt="User Image" />
                            ) ||
                                <img src={require("../../asset/images/nouserimage.jpg")} alt="User Image" />}
                        </div>
                        <div className='text-[#609a42] hover:underline font-semibold text-center mt-3'>{user.fullName}</div>
                    </div>
                    <div className='w-full flex flex-col ' >
                        <div className='flex justify-between p-2 border-b border-gary-300'>
                            <div className=' text-base font-semibold '>{user.fullName}</div>
                            <Link to="/usermanage">
                                <AiOutlineEdit className='text-black mr-3 cursor-pointer' size={25} />
                            </Link>
                        </div>

                        <div className=' p-2'>
                            <div className='font-semibold '>Phone&nbsp;:&nbsp;{user?.phone}</div>
                            <div className='font-semibold '>Email&nbsp;:&nbsp;{user?.email}</div>
                            <div className='font-semibold '>Age&nbsp;:&nbsp;{user?.age}</div>
                            <div className='font-semibold '>DOB&nbsp;:&nbsp;{user?.dob}</div>
                            <div className='  break-words'>Address&nbsp;:&nbsp;{user?.address}</div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex border border-gray-300 rounded-md '>
                    <div className='w-full flex flex-col ' >
                        <div className=' text-base font-semibold p-2 border-b border-gray-300'>Course Detils</div>
                        <div className=' p-2'>
                            <div className='font-bold '>{selectedCourse?.title}</div>
                            <div className='font-semibold  mt-1'>Duration&nbsp;:&nbsp;{selectedCourse?.duration}</div>
                            <div className=' break-words'>description&nbsp;:&nbsp;{selectedCourse?.description}</div>
                            <div className='  break-words mt-1'>Eligibility&nbsp;:&nbsp;{selectedCourse?.eligibility}</div>
                        </div>
                        {applicationData &&
                            <div className='flex justify-between items-center p-2 pr-3 border-t border-gray-300'>
                                <div className={` rounded-full px-3 text-white ${applicationDatas.find(data => (data.text === applicationData?.status)).color}`}>
                                    {applicationData.status}
                                </div>
                                <div className='font-semibold'>
                                    {moment(applicationData.submittedDate).format("MMM Do YYYY")}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentInformation;