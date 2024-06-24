"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { profileData, userLoading } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check if the user has seen the welcome modal
        const hasSeenModal = localStorage.getItem('hasSeenModal');
        if (!hasSeenModal && profileData && !userLoading) {
            setShowModal(true);
        }
    }, [profileData, userLoading]);

    const handleCloseModal = () => {
        setShowModal(false);
        localStorage.setItem('hasSeenModal', 'true');
    };

    return (
        <>
            {/* Page Content */}
            <section className='bg-red-200 min-h-screen flex justify-center items-center text-center'>
                {isClient && profileData !== null && userLoading === false ? (
                    <>
                        {/* Welcome Banner Modal */}
                        {showModal && (
                            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                                <div className="bg-white font-montserrat p-14 rounded-2xl border">
                                    <h4 className="text-xl md:text-5xl">
                                        Welcome Back
                                    </h4>
                                    <h5 className='text-3xl md:text-7xl'>
                                        {profileData?.name}
                                    </h5>
                                    <button
                                        onClick={handleCloseModal}
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Loading . . .</p>
                )}
            </section>
        </>
    );
};

export default Dashboard;
