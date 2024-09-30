import React, { useRef } from "react";
import Swal from "sweetalert2";
import CloudinaryUpload from "./CloudinaryUpload";

const UploadCompanyProfileForm = () => {
  const cloudinaryRef = useRef(null); // Reference for CloudinaryUpload component

  // Function to handle form submission
  const handleCompanyInfo = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const company_name = form.get("name");
    const company_address = form.get("address");
    const company_description = form.get("description");

    // Trigger the Cloudinary upload and get the image URL
    const logoUrl = await cloudinaryRef.current.uploadImage();
    console.log(logoUrl);
    if (!logoUrl) {
      Swal.fire("Error", "Image upload failed. Please try again.", "error");
      return;
    }

    const companyInfo = {
      company_name,
      company_logo: logoUrl,
      company_address,
      company_description,
    };

    console.log(companyInfo);
  };
};

return (
  <div>
    <div className="bg-indigo-100 flex justify-center items-center min-h-[100vh]">
      <div className="border px-3 mx-5 border-indigo-200 flex w-full md:mx-auto rounded-2xl shadow-lg max-w-screen-sm lg:max-w-2xl">
        <form onSubmit={handleCompanyInfo} className="w-full space-y-4">
          <div className="">
            <div className="">
              <label
                htmlFor="logo"
                className="block px-1 mb-2 font-medium text-gray-600"
              >
                Upload Image
              </label>
              {/* Pass ref to the CloudinaryUpload component */}
              <CloudinaryUpload ref={cloudinaryRef} />
            </div>
          </div>

          <div className="pb-4 flex justify-center">
            <button
              type="submit"
              className="w-full px-3 py-2 rounded-md text-white bg-primaryColor active:scale-95 transition hover:bg-primaryColorLight"
              aria-label="Submit"
            >
              Upload Image
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default UploadCompanyProfileForm;
