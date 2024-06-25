"use client";
import { useState } from "react";

const DynamicMultipleForm = () => {
    const [variations, setVariations] = useState([{ id: Date.now() }]);
    const [productVariationArray, setProductVariationArray] = useState([]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formElements = e.target.elements;
        const allVariations = variations.map(variation => {
            const title = formElements[`title-${variation.id}`].value;
            const Dimension = formElements[`Dimension-${variation.id}`].value;
            const IsDeal = formElements[`IsDeal-${variation.id}`].checked;
            const IsSignature = formElements[`IsSignature-${variation.id}`].checked;
            const IsBanner = formElements[`IsBanner-${variation.id}`].checked;
            const old_price = formElements[`oldPrice-${variation.id}`].value;
            const new_price = formElements[`newPrice-${variation.id}`].value;

            return {
                id: variation.id,
                title,
                Dimension,
                IsDeal,
                IsSignature,
                IsBanner,
                old_price,
                new_price,
            };
        });

        setProductVariationArray(allVariations);
    };
    console.log(productVariationArray);

    const addVariation = () => {
        setVariations([...variations, { id: Date.now() }]);
    };

    const removeVariation = (id) => {
        setVariations(variations.filter(variation => variation.id !== id));
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                {variations.map((variation, index) => (
                    <div key={variation.id} className="relative border bg-gray-50 rounded-xl mb-4">
                        <button
                            type="button"
                            className="absolute top-2 right-3"
                            onClick={() => removeVariation(variation.id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-6 w-6 text-red-600 rounded-full border cursor-pointer border-red-600 active:scale-95"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <section className="shadow-xl rounded-xl w-full">
                            <div className="p-3 font-cinzel">
                                <h1 className="text-lg md:text-3xl my-3 text-center font-bold text-gray-600">
                                    Add Product variation {index + 1}
                                </h1>
                                <div className="mb-8">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-lg"> Product Title</span>
                                        </label>
                                        <label className="input-group">
                                            <input
                                                className="block w-full px-5 py-3 text-gray-700 bg-white border rounded-md focus:border-blue-200 focus:ring-blue-200 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring border-blue-200"
                                                required
                                                type="text"
                                                name={`title-${variation.id}`}
                                                placeholder="Write here Product Title"
                                            />
                                        </label>
                                    </div>

                                    <section className="flex flex-row justify-between items-center gap-2 md:gap-5">
                                        <div className="w-full">
                                            <label className="label">
                                                <span className="label-text text-lg">Features</span>
                                            </label>
                                            <div className="flex md:justify-evenly items-center w-full md:gap-10 border rounded-md border-blue-200 py-[2px] bg-white">
                                                <div className="form-control">
                                                    <label className="cursor-pointer label flex gap-2 md:gap-3">
                                                        <span className="text-sm md:text-lg">IsDeal</span>
                                                        <input
                                                            type="checkbox"
                                                            name={`IsDeal-${variation.id}`}
                                                            value={true}
                                                            className="rounded-md checkbox checkbox-info"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="form-control">
                                                    <label className="cursor-pointer label flex gap-2 md:gap-3">
                                                        <span className="text-sm md:text-lg">IsSignature</span>
                                                        <input
                                                            type="checkbox"
                                                            name={`IsSignature-${variation.id}`}
                                                            value={true}
                                                            className="rounded-md checkbox checkbox-info"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="form-control">
                                                    <label className="cursor-pointer label flex gap-2 md:gap-3">
                                                        <span className="text-sm md:text-lg">IsBanner</span>
                                                        <input
                                                            type="checkbox"
                                                            name={`IsBanner-${variation.id}`}
                                                            value={true}
                                                            className="rounded-md checkbox checkbox-info"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="md:flex justify-between gap-5 mb-8">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text text-lg"> Dimension </span>
                                                </label>
                                                <label className="input-group">
                                                    <input
                                                        className="block w-full px-5 py-3 text-gray-700 bg-white border rounded-md focus:border-blue-200 focus:ring-blue-200 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring border-blue-200"
                                                        required
                                                        type="text"
                                                        name={`Dimension-${variation.id}`}
                                                        placeholder="Dimension could be Size , ml , etc"
                                                    />
                                                </label>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="text-lg font-medium">Old Price</span>
                                                    </label>
                                                    <label className="input-group">
                                                        <input
                                                            type="number"
                                                            name={`oldPrice-${variation.id}`}
                                                            className="block w-full px-5 py-3 text-gray-700 bg-white border rounded-md focus:border-blue-200 focus:ring-blue-200 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring border-blue-200"
                                                            required
                                                        />
                                                    </label>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="text-lg">New Price</span>
                                                    </label>
                                                    <label className="input-group">
                                                        <input
                                                            type="number"
                                                            name={`newPrice-${variation.id}`}
                                                            className="block w-full px-5 py-3 text-gray-700 bg-white border rounded-md focus:border-blue-200 focus:ring-blue-200 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring border-blue-200"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                {index === variations.length - 1 && (
                                    <button
                                        type="submit"
                                        className="py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="mr-2"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"
                                            ></path>
                                        </svg>
                                        Save & Next
                                    </button>
                                )}
                            </div>
                        </section>
                    </div>
                ))}
                <div className="flex justify-center my-4">
                    <button
                        type="button"
                        onClick={addVariation}
                        className="btn btn-outline btn-xs rounded-md bg-gray-500 text-white hover:bg-gray-700"
                    >
                        Add Another Variation
                    </button>
                </div>
            </form>
        </>
    );
};

export default DynamicMultipleForm;
