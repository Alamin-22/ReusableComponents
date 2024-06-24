"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Spinner from '@/Components/RarelyUsedComponent/loader/Spinner';
import { MdDeleteForever } from 'react-icons/md';
import AddMainCategoryForm from '@/Components/DashboardRelatedComponent/AdminDashboardComponent/CategoriesComponent/AddMainCategory/AddMainCategoryForm';
import { useGetMainCategoryQuery } from '@/app/Redux/features/banner/categoriesApi';
import useAxiosPublic from '@/Hooks/useAxiosPublic';

const AddMainCategory = () => {
    const axiosPublic = useAxiosPublic();
    const { data: mainCategories, isLoading, refetch } = useGetMainCategoryQuery();
    const [selectedIds, setSelectedIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return <Spinner />;
    }

    // select Func
    const handleToggleCheckbox = (categoryId) => {
        const selectedIndex = selectedIds.indexOf(categoryId);
        let newSelected = [...selectedIds];

        if (selectedIndex === -1) {
            newSelected.push(categoryId);
        } else {
            newSelected.splice(selectedIndex, 1);
        }

        setSelectedIds(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedIds.length === mainCategories.length) {
            setSelectedIds([]);
        } else {
            const allIds = mainCategories.map((category) => category.id);
            setSelectedIds(allIds);
        }
    };

    const isSelected = (categoryId) => selectedIds.indexOf(categoryId) !== -1;


    // 
    const handleDeleteCategory = async (category) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            const CategoryId = category.id;
            try {
                const res = await axiosPublic.post(`/delete-category-data/`, { id: CategoryId });

                if (res.data.status_code === 200) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your banner has been deleted.",
                        icon: "success"
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleDeleteSelectedCategory = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            //All Selected ids coming from state
            try {
                const res = await axiosPublic.post(`/`, { ids: selectedIds });

                if (res.data.status_code === 200) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your banner has been deleted.",
                        icon: "success"
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-gray-50 rounded-lg shadow-lg p-8 w-full max-w-xl">
                        <AddMainCategoryForm closeModal={closeModal} refetch={refetch} />
                        <button onClick={closeModal} className="absolute px-2 py-[1.5px] bg-gray-500 rounded-full top-2 right-2 text-white">
                            X
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className='px-4 py-2 md:px-7 md:py-7 font-cinzel min-h-screen'>
                <div className='border bg-white p-4 rounded-xl flex justify-between items-center'>
                    <div className='flex'>
                        <h3 className='text-xl md:text-3xl '>Main Category</h3>
                    </div>
                    <button
                        onClick={openModal}
                        className='btn btn-sm md:btn md:text-white md:rounded-xl
                            btn-success text-white rounded-xl lg:text-lg'>
                        Add Category
                    </button>
                </div>
                {
                    selectedIds.length >= 2 &&

                    <div className='my-5 flex justify-center '>
                        <button onClick={handleDeleteSelectedCategory}
                            className='btn btn-sm btn-outline rounded-md hover:bg-gray-700  md:text-lg px-10'>
                            Delete All Selected Category
                        </button>
                    </div>
                }
                {/* Table */}
                <section className='my-7'>
                    <div className="overflow-x-auto bg-white rounded-xl border font-montserrat">
                        <table className="table table-zebra">
                            <thead className='bg-zinc-200 text-blue-600'>
                                <tr className='text-center text-lg'>
                                    <th className='max-w-11'>
                                        <button
                                            className='btn btn-sm btn-outline text-blue-600 
                                            font-semibold hover:bg-blue-600 rounded-md'
                                            onClick={handleSelectAll}
                                        >
                                            Select All
                                        </button>
                                    </th>
                                    <th>Category</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render Rows */}
                                {mainCategories.map((category, idx) => (
                                    <tr key={idx} className='border-b border-gray-200 text-center'>
                                        <td>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox rounded-md"
                                                    checked={isSelected(category.id)}
                                                    onChange={() => handleToggleCheckbox(category.id)}
                                                />
                                            </label>
                                        </td>
                                        <td>
                                            <div className="font-bold">{category.title}</div>
                                        </td>
                                        <td>
                                            <button aria-label='Delete Product Button'
                                                onClick={() => handleDeleteCategory(category)}>
                                                <MdDeleteForever className="text-red-600 text-3xl active:scale-90" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AddMainCategory;
