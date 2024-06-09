
import Link from 'next/link';
import React from 'react';
import { PiTruckDuotone } from "react-icons/pi";
import "@/Components/HeaderFooter/Header.css"

const AnnouncementBanner = () => {
    const user = false;

    return (
        <div className="relative hidden md:block bg-cover bg-center sectionHeading"
            style={{ backgroundImage: 'url(https://i.ibb.co/2tt0mTj/top-strip-summer-24.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-15"></div>
            <div className="relative max-w-[85rem] px-4 py-[3.5px] sm:px-6 lg:px-8 mx-auto">
                <div className="grid grid-cols-2">
                    <div className="hidden md:block text-center w-full md:text-start overflow-hidden marquee-container">
                        <p className="text-lg text-white w-full">
                            Welcome to Meherun Beauty Products. Contact Us on mehrunproducts@gmail.com
                        </p>
                    </div>
                    <div className="text-white">
                        <ul className='font-semibold flex gap-2 md:gap-4 justify-end items-center mx-auto -mr-6 lg:mr-0 py-1'>
                            <li className='text-left hover:text-gray-300 transition'>
                                <Link href={"/"} className='hidden xl:flex items-center gap-2'>
                                    <PiTruckDuotone className='text-2xl' />
                                    Track Your Products |
                                </Link>
                            </li>
                            <li className='hover:text-gray-300 transition'>
                                <Link href={"/about-us"}>About Us</Link>
                            </li>
                            <li>|</li>
                            <li className='hover:text-gray-300 transition'>
                                <Link href={"/contact-us"}>Contact Us</Link>
                            </li>
                            <li className='block md:hidden lg:block'>|</li>
                            <li className='hover:text-gray-300 transition'>
                                {
                                    user ?
                                        <>
                                            <Link href={""}>My Account</Link>
                                        </>
                                        :
                                        <>
                                            <Link href={"signIn"} className='block md:hidden lg:block'>Login</Link>
                                        </>
                                }
                            </li>
                            {
                                !user &&
                                <>
                                    <li className='block md:hidden lg:block'>|</li>
                                    <li className='hover:text-gray-300 transition block md:hidden lg:block'>
                                        <Link href={"signUp"}>Register</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnnouncementBanner;
