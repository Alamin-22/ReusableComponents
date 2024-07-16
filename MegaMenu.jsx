import React, { useState, useRef } from 'react';
import Link from 'next/link';

const MegaMenu = ({ navbarCategories }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const leaveTimeoutRef = useRef(null);

    const handleMouseEnter = (id) => {
        setActiveCategory(id);
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
    };

    const handleMouseLeave = () => {
        leaveTimeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 300); // Adjust the delay time as needed (in milliseconds)
    };

    return (
        <div className="relative">
            <ul className="flex flex-wrap items-center justify-start font-semibold font-cinzel">
                {navbarCategories?.map((category) => (
                    <li
                        key={category.id}
                        className="relative group px-3 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(category.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {
                            !category.is_special ? (
                                <Link href={`/product_category/${category.slug}`}>
                                    <p className="text-gray-700 hover:text-primaryColor hover:border-b-2">
                                        <button className="flex items-center font-semibold">{category.title}</button>
                                    </p>
                                </Link>
                            ) : (
                                <Link href={`/product_category/${category.slug}`}>
                                    <p className={`text-white btn btn-xs ml-5 border-none rounded-lg`}
                                        style={{ backgroundColor: category.color }}
                                    >
                                        <button className="flex items-center font-semibold">{category.title}</button>
                                    </p>
                                </Link>
                            )
                        }

                        {/* dropdown mega menu */}
                        {activeCategory === category.id && category.related_subcategory && category.related_subcategory.length > 0 && (
                            <div
                                className="fixed left-1/2 transform -translate-x-1/2 top-40 mt-2 transition-transform duration-500 ease-in-out z-50 w-full max-w-7xl"
                                style={{
                                    opacity: 1,
                                    visibility: 'visible',
                                }}
                            >
                                <div className="relative p-6 bg-gray-50 rounded-xl shadow-xl">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                        {/* Render subcategories with sub-subcategories first */}
                                        {category.related_subcategory
                                            .filter(subcategory => subcategory.related_subsubcategory.length > 0)
                                            .map((subcategory) => (
                                                <div key={subcategory.id}>
                                                    <Link href={`/product_category/${subcategory.slug}`}>
                                                        <p className="text-gray-700 hover:text-primaryColor">
                                                            <button className="flex items-center font-semibold">{subcategory.title}</button>
                                                        </p>
                                                    </Link>
                                                    <ul className="mt-1 text-sm text-gray-400">
                                                        {subcategory.related_subsubcategory.map((subsubcategory) => (
                                                            <li key={subsubcategory.id} className='list-disc ml-4'>
                                                                <Link href={`/product_category/${subsubcategory.slug}`}>
                                                                    <p className="text-gray-500 hover:text-primaryColor">
                                                                        <button className="flex items-center font-semibold">{subsubcategory.title}</button>
                                                                    </p>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                        {/* Render subcategories without sub-subcategories in a single column */}
                                        <div>
                                            {category.related_subcategory
                                                .filter(subcategory => subcategory.related_subsubcategory.length === 0)
                                                .map((subcategory) => (
                                                    <div key={subcategory.id}>
                                                        <Link href={`/product_category/${subcategory.slug}`}>
                                                            <p className="text-gray-700 hover:text-primaryColor">
                                                                <button className="flex items-center font-semibold">{subcategory.title}</button>
                                                            </p>
                                                        </Link>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MegaMenu;
