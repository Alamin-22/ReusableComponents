import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import Swal from "sweetalert2";

const OTPAuthentication = ({ handleResendOTP, closeModal, userInfo }) => {
    const axiosPublic = useAxiosPublic();
    const router = useRouter();
    const [error, setError] = useState("");
    const { email } = userInfo;
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to the next input if the current one is filled
        if (element.value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const paste = event.clipboardData.getData("text");
        const pasteArray = paste.split("").slice(0, 4);
        const newOtp = [...otp];

        pasteArray.forEach((char, index) => {
            newOtp[index] = char;
        });

        setOtp(newOtp);

        // Move focus to the end of the filled inputs
        const nextIndex = pasteArray.length >= 4 ? 3 : pasteArray.length;
        inputRefs.current[nextIndex].focus();
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        const OTPInfo = {
            otp: enteredOtp, email
        }
        // Add your OTP verification 

        axiosPublic.post("/auth/otp-verification/", OTPInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data.status_code === 200) {
                    closeModal();
                    router.push("/authentication/login");
                    Swal.fire({
                        title: "Registration Successful!!",
                        text: "Please Login with Created Email & password.",
                        icon: "success"
                    });
                } {
                    setError(res.data.message)
                }
            })
            .catch(error => console.log(error))

        console.log("Entered OTP: ", enteredOtp);
    };

    return (
        <>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-medium font-montserrat ">Email Verification</h3>
                <h4 className="text-sm mt-1 text-gray-500"> We have sent 4 digit code to {email}. <br /> If this Email is valid</h4>
            </div>
            <form onSubmit={handleVerifyOTP} >
                <div className="flex flex-col space-y-8   ">
                    <div className="flex flex-row flex-wrap items-center gap-1 md:gap-3  justify-center w-full   ">
                        {otp.map((data, index) => (
                            <div key={index} className="w-14 md:w-16 h-14 md:h-16 ">
                                <input
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    name={`otp${index + 1}`}
                                    maxLength="1"
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onPaste={handlePaste}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <div className="flex flex-col space-y-5">
                        <div>
                            <div className="flex justify-center">
                                <button className="btn w-full px-3 text-white bg-primaryColor hover:bg-primaryColorLight border-none"
                                    aria-label="OTP Verification"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                            <p>Didn&apos;t receive code?</p>
                            <button
                                type="button"
                                className="flex flex-row items-center text-blue-600 active:scale-95"
                                onClick={() => (handleResendOTP(email))}
                            >
                                Resend
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default OTPAuthentication;
