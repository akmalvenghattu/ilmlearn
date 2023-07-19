import React from 'react';

const NotFound = () => {
    // onClick={() => Router.push('/login')}
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
            <div className="font-semibold text-red-500 text-xl">You can't access this page</div>
            <div className="hover:underline cursor-pointer font-semibold" >Please login or register and retry</div>
        </div>
    );
};

export default NotFound;