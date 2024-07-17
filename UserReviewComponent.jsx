import Image from "next/image";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UserReview = () => {
    const { profileData } = useSelector((state) => state.auth);

    const reviews = []; // Replace with actual reviews data
    const [givenRating, setGivenRatingRating] = useState(0);
    const [warningError, setWarningError] = useState("");
    const [reviewsToShow, setReviewsToShow] = useState(5);
    const [allReviewsLoaded, setAllReviewsLoaded] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [localImages, setLocalImages] = useState([]);

    useEffect(() => {
        if (reviews.length <= reviewsToShow) {
            setAllReviewsLoaded(true);
        } else {
            setAllReviewsLoaded(false);
        }
    }, [reviewsToShow, reviews.length]);

    const loadMoreReviews = () => {
        setReviewsToShow(reviewsToShow + 5);
    };

    const handleRatingClick = (index) => {
        setGivenRatingRating(index + 1);
        setWarningError("");
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const fileUrls = files.map(file => URL.createObjectURL(file));

        setLocalImages(prevImages => [...prevImages, ...fileUrls]);
        setSelectedImages(prevImages => [...prevImages, ...files]);
    };

    const removeImage = (index) => {
        setLocalImages(prevImages => prevImages.filter((_, i) => i !== index));
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleComment = async (e) => {
        e.preventDefault();
        const commentForm = new FormData(e.currentTarget);
        const comment = commentForm.get("comment");
        const currentTime = new Date().toLocaleString();

        if (givenRating === 0) {
            setWarningError("Please Give a Rating on our product");
            return;
        }

        const imageUrls = [];
        for (const file of selectedImages) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch(image_hosting_api, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const imageData = await response.json();
                    imageUrls.push(imageData.data.url);
                } else {
                    throw new Error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        const newReview = {
            Review: comment,
            GivenRating: givenRating,
            userName: profileData.name,
            dateTime: currentTime,
            images: imageUrls,
        };

        console.log(newReview);
        // axios.post("/post-reviews", newReview)
        //     .then(() => {
        //         // refetch(); // Add refetch function to reload reviews
        //         setGivenRatingRating(0);
        //         setSelectedImages([]);
        //         setLocalImages([]);
        //         document.getElementById("myForm").reset();
        //         Swal.fire("Success", `Your Review Successfully Added`, "success");
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    return (
        <section>
            <div className="bg-[#f3e2e2] p-4 rounded-lg shadow-md">
                <div className="">
                    <div className="avatar space-x-2">
                        <div className="w-14 rounded-full">
                            <Image
                                width={100} height={100}
                                src={"https://i.ibb.co/Rj5Gg2t/useravater-Update.png"}
                                alt='Author Image' />
                        </div>
                        <p className="relative font-semibold">
                            {profileData?.name || "Unknown User"}
                            <span className="absolute top-5 left-0 text-gray-400">
                                Author
                            </span>
                        </p>
                    </div>
                </div>
                <form id='myForm' onSubmit={handleComment} className="py-2">
                    <div className="flex flex-col md:flex-row items-center md:gap-4 flex-wrap">
                        <div className="flex items-center">
                            <p className="text-gray-600 mr-2">Rating:</p>
                            {[...Array(5)].map((_, index) => (
                                <span key={index} className="mx-[1px] text-xl md:mx-[2px] text-orange-400 cursor-pointer" onClick={() => handleRatingClick(index)}>
                                    {index < givenRating ? <AiFillStar /> : <AiOutlineStar />}
                                </span>
                            ))}
                        </div>
                        {warningError !== "" && (
                            <p className='text-sm text-red-600 font-semibold'>&#x1F448; {warningError}</p>
                        )}
                    </div>
                    <div className='relative'>
                        <label htmlFor="comment" className="sr-only">Comment</label>
                        <input
                            id="comment"
                            type="text"
                            name="comment"
                            required
                            placeholder="Share your experience with this product with us"
                            className="input input-bordered input-md w-full rounded-md mt-2"
                        />
                        <label htmlFor="file-upload" className="absolute btn btn-sm right-14 top-3.5 hover:text-white hover:bg-red-400 hover:border-none">
                            <FaImage className="text-lg" />
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden "
                            onChange={handleImageChange}
                            multiple
                        />
                        <button type="submit" className="absolute btn btn-sm right-2 top-3.5 hover:text-white hover:bg-red-400 hover:border-none">
                            <LuSend className="text-lg" />
                        </button>
                    </div>
                </form>

                {/* Display selected images */}
                {localImages.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 mb-4">
                        {localImages.map((url, index) => (
                            <div key={index} className="w-24 h-24 relative">
                                <Image
                                    className="rounded-md"
                                    src={url} alt={`Selected image ${index + 1}`}
                                    layout="fill" objectFit="cover" />
                                <button
                                    className="absolute top-1 right-1"
                                    onClick={() => removeImage(index)}
                                >
                                    <MdCancel className="text-2xl text-gray-700 active:scale-90 hover:text-primaryColor transition" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    {/* review Section */}
                    <section>
                        <div className="bg-white p-4 rounded-lg">
                            {reviews && reviews.length > 0 ? (
                                <>
                                    {/* Render reviews here */}
                                    <div className='flex justify-center'>
                                        <button onClick={loadMoreReviews} disabled={allReviewsLoaded} className='btn btn-outline'>
                                            {allReviewsLoaded ? "All Reviews Loaded" : "Load More Reviews"}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center font-medium text-red-500">Currently, we have no reviews for this product.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default UserReview;
