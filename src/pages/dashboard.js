import React, { useState, useEffect, useContext } from 'react';

import StudentInformation from 'components/User/StudentInformation';
import Loading from 'components/CustomComponents/Loading';
import StatisticsChart from 'components/Dashboard/StatisticsChart';

import { applicationData, enrollmentData, popularityData } from 'utils/constArray';
import AppContext from 'server_api/context/AppContext';

const Dashboard = () => {
    const { loggedUser, applications } = useContext(AppContext);

    return (
        <div className='flex flex-col bg-slate-100 justify-center items-center min-h-full	'>
            {loggedUser &&
                <>
                    <div className='container mt-5 flex md:mt-24 rounded-md bg-white p-5 shadow-sm'>
                        <StudentInformation user={loggedUser} applications={applications} />
                    </div>
                    <div className='container w-full grid grid-cols-1 gap-4 place-items-center mt-5  md:mt-24 rounded-md bg-white p-5 shadow-sm'>
                        <StatisticsChart data={enrollmentData} />
                        <StatisticsChart data={popularityData} />
                        <StatisticsChart data={applicationData} />
                    </div>
                </>
                ||
                <Loading />
            }
        </div>
    );
}

export default Dashboard;