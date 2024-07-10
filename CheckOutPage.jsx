"use client"
import AnimateLoader from '@/Components/RarelyUsedComponent/loader/AnimateLoader';
import useCartFunctions from '@/Hooks/useCartFunctions';
import React, { useEffect, useState } from 'react';
import multiplyIcon from "@/Assets/delete.webp";
import Image from 'next/image';
import Spinner from '@/Components/RarelyUsedComponent/loader/Spinner';
import Link from 'next/link';
import { MdArrowRightAlt } from 'react-icons/md';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import internationalNumber from '@/lib/internationalNumber';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { useRouter } from 'next/navigation';

const CheckoutForm = () => {
    const axiosPublic = useAxiosPublic();
    const router = useRouter();
    const { profileData } = useSelector(store => store.auth);
    const [isClient, setIsClient] = useState(false);
    const [useBillingForShipping, setUseBillingForShipping] = useState(false);
    const countriesCode = internationalNumber();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {
        cartData,
        isLoading,
        totalOldPrice,
        totalNewPrice,
        totalSavings,
    } = useCartFunctions();

    const toastOptions = {
        style: { border: '1px solid #EE2761', padding: '16px', color: '#EE2761' },
        iconTheme: { primary: '#EE2761', secondary: '#FFFAEE' }
    };

    const handleBillingInfo = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        // Billing Info
        const firstName = form.get("firstName");
        const lastName = form.get("lastName");
        const name = `${firstName} ${lastName}`;
        const number = form.get("number");
        const countryCode = form.get("countryCode");
        const phone = `${countryCode}${number}`;
        const email = form.get("email");
        const address = form.get("address");
        const city = form.get("city");
        const country = form.get("country");

        // Validate phone number
        const phoneRegex = /^\+?\d{8,15}$/;
        if (!phoneRegex.test(phone)) {
            toast.error(`Please enter a valid phone number`, toastOptions);
            return;
        }

        const billing_details = {
            name, email, phone, address, city, country,
            total_amount: totalNewPrice,
            payment_mode: "online",
        };

        let formDataToSubmit = { billing_details };

        // Shipping Info
        if (!useBillingForShipping) {
            const shippingFirstName = form.get("shippingFirstName");
            const shippingLastName = form.get("shippingLastName");
            const shippingName = `${shippingFirstName} ${shippingLastName}`;
            const shippingNumber = form.get("shippingNumber");
            const shippingCountryCode = form.get("shippingCountryCode");
            const shippingPhone = `${shippingCountryCode}${shippingNumber}`;
            const shippingEmail = form.get("shippingEmail");
            const shippingAddress = form.get("shippingAddress");
            const shippingCity = form.get("shippingCity");
            const shippingCountry = form.get("shippingCountry");

            // Validate shipping phone number
            if (!phoneRegex.test(shippingPhone)) {
                toast.error(`Please enter a valid shipping phone number`, toastOptions);
                return;
            }

            const shipping_details = {
                name: shippingName,
                email: shippingEmail,
                phone: shippingPhone,
                address: shippingAddress,
                city: shippingCity,
                country: shippingCountry
            };

            formDataToSubmit = { billing_details, shipping_details };
        }

        // sending data to the server
        axiosPublic.post("/checkout/", formDataToSubmit)
            .then((res) => {
                if (res.data.status_code === 200) {
                    router.push(res.data.payment_url);
                } else {
                    toast.error(`Something Went Wrong`, toastOptions);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(`Something Went Wrong`, toastOptions);
            })



    };

    if (!isClient) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleBillingInfo} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    {/* for billing info */}
                    <div className="bg-[#fffdfd9c] border border-rose-100 p-4 rounded-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold ">Billing Information</h2>
                            <div className="form-control flex-row">
                                <label className="cursor-pointer text-sm label gap-3">
                                    <input
                                        type="checkbox"
                                        name='checkBox'
                                        value={true}
                                        className="checkbox checkbox-sm checkbox-error rounded-md"
                                        onChange={() => setUseBillingForShipping(!useBillingForShipping)}
                                    />
                                    <span>Use This Info For Shipping</span>
                                </label>
                            </div>
                        </div>
                        <section>
                            <div className="flex space-x-4 mb-4">
                                <div className="w-1/2">
                                    <label className="block text-sm mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="email" className="text-sm">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={profileData?.email}
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3 mt-4">
                                    <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>
                                    <div className="flex">
                                        <select
                                            id="countryCode"
                                            name="countryCode"
                                            className="block w-1/3 px-4 py-2 mr-2 text-gray-700 bg-white border rounded-l-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300 text-sm"
                                        >
                                            {countriesCode.map((country, index) => (
                                                <option className='text-sm' key={index} value={country.code}>
                                                    {country.name} ({country.code})
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            id="phoneNumber"
                                            name="number"
                                            type="text"
                                            placeholder="Write Your Contact Number here.."
                                            className="block flex-1 px-4 py-2 text-gray-700 bg-white border rounded-r-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full sm:col-span-3 mt-4 flex justify-between md:gap-4">
                                    <div>
                                        <label htmlFor="country" className="text-sm">Country</label>
                                        <input
                                            id="country"
                                            type="text"
                                            name="country"
                                            placeholder="Country"
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="text-sm">City</label>
                                        <input
                                            id="city"
                                            type="text"
                                            name="city"
                                            placeholder="Billing City"
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="address" className="text-sm">Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        placeholder="Where you want to pick up the order"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                        required
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* for shipping info */}
                    {!useBillingForShipping && (
                        <div className="bg-[#fffdfd9c] border border-rose-100 p-4 rounded-md">
                            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                            <section>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="shippingFirstName"
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                            placeholder="Enter your first name"
                                            required={!useBillingForShipping}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="shippingLastName"
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                            placeholder="Enter your last name"
                                            required={!useBillingForShipping}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="shippingEmail" className="text-sm">Email</label>
                                    <input
                                        id="shippingEmail"
                                        type="email"
                                        name="shippingEmail"
                                        placeholder="Email"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                        required={!useBillingForShipping}
                                    />
                                </div>
                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3 mt-4">
                                        <label htmlFor="shippingPhoneNumber" className="text-sm">Phone Number</label>
                                        <div className="flex">
                                            <select
                                                id="shippingCountryCode"
                                                name="shippingCountryCode"
                                                className="block w-1/3 px-4 py-2 mr-2 text-gray-700 bg-white border rounded-l-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300 text-sm"
                                            >
                                                {countriesCode.map((country, index) => (
                                                    <option className='text-sm' key={index} value={country.code}>
                                                        {country.name} ({country.code})
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                id="shippingPhoneNumber"
                                                name="shippingNumber"
                                                type="text"
                                                placeholder="Write Your Contact Number here.."
                                                className="block flex-1 px-4 py-2 text-gray-700 bg-white border rounded-r-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                                required={!useBillingForShipping}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full sm:col-span-3 mt-4 flex justify-between md:gap-4">
                                        <div>
                                            <label htmlFor="shippingCountry" className="text-sm">Country</label>
                                            <input
                                                id="shippingCountry"
                                                type="text"
                                                name="shippingCountry"
                                                placeholder="Country"
                                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                                required={!useBillingForShipping}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="shippingCity" className="text-sm">City</label>
                                            <input
                                                id="shippingCity"
                                                type="text"
                                                name="shippingCity"
                                                placeholder="Billing City"
                                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                                required={!useBillingForShipping}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="shippingAddress" className="text-sm">Address</label>
                                        <textarea
                                            id="shippingAddress"
                                            name="shippingAddress"
                                            placeholder="Where you want to pick up the order"
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-opacity-40 focus:outline-none border-red-300"
                                            required={!useBillingForShipping}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#fffdfd9c] border border-rose-100 p-4 rounded-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order summary</h2>
                        <table className="w-full mb-4">
                            <thead>
                                <tr className='text-gray-700'>
                                    <th className="text-left py-2">Item</th>
                                    <th className="text-right py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-4">
                                {cartData.map((cart, idx) => (<tr key={idx} className="border-b">
                                    <td className="py-2 flex gap-2 items-center w-[90%]">
                                        {cart.title}
                                        <div>
                                            <Image
                                                src={multiplyIcon}
                                                width={10}
                                                height={10}
                                                alt='multiply icon'
                                            />
                                        </div>
                                        {cart.quantity}
                                    </td>
                                    <td className="text-right pl-1 py-2">${cart.new_price}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        {isLoading && <AnimateLoader />}
                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                                <span>Original price</span>
                                <span>${totalOldPrice}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Savings</span>
                                <span className='text-green-400 font-semibold'>$ {totalSavings}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Store Pickup</span>
                                <span>$ 00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax</span>
                                <span>$ 00</span>
                            </div>
                            <div className="flex justify-between font-semibold text-gray-700 text-xl">
                                <span>Total</span>
                                <span>$ {totalNewPrice}</span>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <button
                                type="submit"
                                className="btn rounded-md w-full hover:bg-[#ee2761] bg-[#f03d71] text-white"
                                aria-label="Proceed to Checkout"
                            >
                                Continue To Payment
                            </button>
                            <Link href={"/"} className="flex justify-center mt-6">
                                <button className="btn btn-outline w-full px-10 rounded-md text-[#f15281] hover:bg-[#f03d71] hover:border-none" aria-label="Continue Shopping">
                                    Continue Shopping
                                    <MdArrowRightAlt className="text-2xl" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
