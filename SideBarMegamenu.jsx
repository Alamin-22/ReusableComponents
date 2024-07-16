import Link from 'next/link';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

const SliderMenu = ({ navbarCategories }) => {
    return (
        <>
            <li>
                <div className="drawer drawer-end block lg:hidden z-40">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer hover:text-pink-500 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu py-4 w-72 min-h-full bg-base-200 text-base-content">
                            {/* Search Field */}
                            <li className='my-3'>
                                <div className="join p-0 w-60 mx-auto bg-[#EE2761] hover:bg-[#f75c5c]">
                                    <input name='search' type="text" className="w-full input input-bordered join-item focus:outline-none" placeholder="Search" />
                                    <button className="text-white" aria-label="Search">
                                        <IoSearch className="text-2xl mr-2" />
                                    </button>
                                </div>
                            </li>

                            {/* Loop through navbarCategories */}
                            {navbarCategories?.map(category => (
                                <li key={category.id}>
                                    {category?.related_subcategory.length > 0 ? (
                                        <details className="group">
                                            <summary className="flex gap-36 items-center font-medium marker:content-none hover:cursor-pointer">
                                                {
                                                    <Link href={`/product_category/${category.slug}`}>
                                                        <p className="text-gray-700 hover:text-primaryColor">
                                                            <button className="flex items-center font-semibold">{category.title}</button>
                                                        </p>
                                                    </Link>
                                                }
                                            </summary>
                                            <article className="px-4 pb-4 w-64">
                                                <ul>
                                                    {category.related_subcategory.map(subcategory => (
                                                        <li key={subcategory?.id} className="group">
                                                            {subcategory.related_subsubcategory.length > 0 ? (
                                                                <details className="group">
                                                                    <summary className="flex justify-between items-center font-medium marker:content-none hover:cursor-pointer">
                                                                        <Link href={`/product_category/${subcategory.slug}`}>
                                                                            <p className="text-gray-700 hover:text-primaryColor">
                                                                                <button className="flex items-center font-semibold">{subcategory.title} </button>
                                                                            </p>
                                                                        </Link>
                                                                    </summary>
                                                                    <article className="px-2 pb-2">
                                                                        {subcategory.related_subsubcategory.map(subsubcategory => (
                                                                            <li key={subsubcategory.id} className='list-disc ml-4'>
                                                                                <Link href={`/product_category/${subsubcategory.slug}`}>
                                                                                    <p className="text-gray-500  hover:text-primaryColor">
                                                                                        <button className="flex items-center text-xs font-semibold">{subsubcategory.title}</button>
                                                                                    </p>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </article>
                                                                </details>
                                                            ) : (
                                                                <>

                                                                    <Link href={`/product_category/${subcategory.slug}`}>
                                                                        <p className="text-gray-800 hover:text-primaryColor">
                                                                            <button className="flex items-center  font-semibold">{subcategory.title}</button>
                                                                        </p>
                                                                    </Link>
                                                                </>

                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </article>
                                        </details>
                                    ) : (
                                        <>
                                            {
                                                !category.is_special ? (
                                                    <Link href={`/product_category/${category.slug}`}>
                                                        <p className="text-gray-700 text-[16px] hover:text-primaryColor">
                                                            <button className="flex items-center font-semibold  ">{category.title}</button>
                                                        </p>
                                                    </Link>
                                                ) : (
                                                    <Link href={`/product_category/${category.slug}`}>
                                                        <p className={` text-white btn btn-xs border-none rounded-lg`}
                                                            style={{ backgroundColor: category.color }}
                                                        >
                                                            <button className="flex items-center font-semibold">{category.title}</button>
                                                        </p>
                                                    </Link>
                                                )
                                            }
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
        </>
    );
};

export default SliderMenu;
