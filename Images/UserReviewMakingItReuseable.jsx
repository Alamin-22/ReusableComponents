import { useGetReviewsOfTheProductQuery } from "@/app/Redux/features/getProducts/getProductApi";
import ImageGallery from "@/Components/RarelyUsedComponent/Image/ImageGallery";
import Image from "next/image";
import { useState } from "react";

const UserReview = ({ product_id }) => {
    const { data: reviewsOfTheProduct } = useGetReviewsOfTheProductQuery({ product_id });
    const reviews = reviewsOfTheProduct;
    const [selectedReview, setSelectedReview] = useState(null);
    const [initialIndex, setInitialIndex] = useState(0);

    const openImageModal = (review, index) => {
        setSelectedReview(review);
        setInitialIndex(index);
    };

    const closeImageModal = () => setSelectedReview(null);

    return (
        <section>
            <div className="bg-[#ffe7f1] p-4 rounded-lg shadow-md">
                <section>
                    <div className="rounded-lg">
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review, idx) => (
                                <section key={idx} className="bg-slate-50 p-4 rounded-lg mb-4">
                                    <p className="text-gray-700 border bg-white rounded-lg p-3">{review.review_comment}</p>
                                    <div className="flex flex-wrap gap-4 items-center mt-2">
                                        {review.review_images.map((image, imgId) => (
                                            <Image
                                                key={imgId}
                                                width={64}
                                                height={64}
                                                loading="lazy"
                                                src={image || ""}
                                                alt="Reviewed Image"
                                                className="w-auto h-auto rounded-md cursor-pointer"
                                                onClick={() => openImageModal(review, imgId)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            ))
                        ) : (
                            <div className="text-center mt-6 py-3 bg-white border w-full rounded-md">
                                <p className="font-semibold text-red-500">No reviews yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Image Gallery Modal */}
            {selectedReview && (
                <ImageGallery
                    images={selectedReview.review_images}
                    initialIndex={initialIndex}
                    onClose={closeImageModal}
                />
            )}
        </section>
    );
};

export default UserReview;
