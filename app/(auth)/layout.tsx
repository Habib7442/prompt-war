import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className='flex flex-col p-5 bg-black items-center justify-center h-full'>
            {children}
        </div>
    );
};

export default AuthLayout;
