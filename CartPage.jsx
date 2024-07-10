// "use client"
// import Image from 'next/image';
// import { MdArrowRightAlt } from 'react-icons/md';
// import Card from '@/Components/HomeComponent/FeaturedProducts/Card/Card';
// import Link from 'next/link';
// import Spinner from '@/Components/RarelyUsedComponent/loader/Spinner';
// import toast from 'react-hot-toast';
// import { useEffect, useState } from 'react';
// import { setRefetch } from '@/app/Redux/features/RefetchSlice/refetchSlice';
// import useAxiosPublic from '@/Hooks/useAxiosPublic';
// import { useDispatch, useSelector } from 'react-redux';
// import { useGetCartDataQuery } from '@/app/Redux/features/getProducts/getProductApi';

// const MyShoppingCart = () => {
//     const { profileData } = useSelector((state) => state.auth);
//     const axiosPublic = useAxiosPublic();
//     const dispatch = useDispatch();
//     const isRefetch = useSelector((state) => state.refetch.isRefetch);

//     const [cartData, setCartData] = useState([]);
//     const { data: cartDataFromServer, isLoading, refetch } = useGetCartDataQuery();

//     // Fetch cart data on mount or refetch trigger
//     useEffect(() => {
//         refetch();
//     }, [refetch]);

//     // Effect to handle refetch trigger from Redux state change
//     useEffect(() => {
//         if (isRefetch) {
//             refetch();
//             dispatch(setRefetch(false));
//         }
//     }, [isRefetch, dispatch, refetch]);
//     // Want to update when data change 
//     useEffect(() => {
//         const storedCart = localStorage.getItem('cart');
//         if (profileData !== null && cartDataFromServer && cartDataFromServer.length > 0) {
//             setCartData(cartDataFromServer.map(item => ({ ...item })));
//             console.log("seting server data");
//         } else if (profileData === null && storedCart) {
//             console.log("seting local data");
//             setCartData(JSON.parse(storedCart));
//         } else {
//             setCartData([]);
//         }
//     }, [cartDataFromServer, profileData]);

//     // Function to update cart data in local storage
//     const updateLocalStorageCart = (cartData) => {
//         localStorage.setItem("cart", JSON.stringify(cartData));
//     };

//     // Function to handle item removal from cart
//     const removeFromCart = (index, cartItem) => {
//         const updatedCart = [...cartData];
//         updatedCart.splice(index, 1);
//         setCartData(updatedCart);
//         updateLocalStorageCart(updatedCart);

//         const toastOptions = {
//             style: { border: '1px solid #EE2761', padding: '16px', color: '#EE2761' },
//             iconTheme: { primary: '#EE2761', secondary: '#FFFAEE' },
//         };

//         if (profileData !== null && cartDataFromServer && cartDataFromServer.length > 0) {
//             const body = { product_variation_id: cartItem.product_variation_id };

//             axiosPublic.post("/delete-cart-item/", body)
//                 .then(res => {
//                     if (res.status === 200) {
//                         toast.success(`Product Removed From Cart`, toastOptions);
//                     } else {
//                         toast.error(`Something Went Wrong`, toastOptions);
//                     }
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     toast.error(`Error removing product from server`, toastOptions);
//                 });
//         } else {
//             toast.success(`Product Removed From Cart`, toastOptions);
//         }
//     };

//     // Function to handle item increment in cart
//     const handleItemIncrement = (index) => {
//         const updatedCart = [...cartData];
//         updatedCart[index].quantity++;
//         setCartData(updatedCart);


//         const body = {
//             product_variation_id: cartData[index].product_variation_id,
//             quantity: updatedCart[index].quantity,
//         };

//         if (profileData !== null && cartDataFromServer && cartDataFromServer.length > 0) {
//             console.log("calling api to Increment");
//             sendQuantityUpdateToServer(body);
//         }else{
//             console.log("calling for local");
//             updateLocalStorageCart(updatedCart);
//         }
//     };

//     // Function to handle item decrement in cart
//     const handleItemDecrement = (index) => {
//         const updatedCart = [...cartData];
//         if (updatedCart[index].quantity > 1) {
//             updatedCart[index].quantity--;
//             setCartData(updatedCart);


//             const body = {
//                 product_variation_id: cartData[index].product_variation_id,
//                 quantity: updatedCart[index].quantity,
//             };

//             if (profileData !== null && cartDataFromServer && cartDataFromServer.length > 0) {
//                 console.log("calling api to Increment");
//                 sendQuantityUpdateToServer(body);
//             }else{
//                 console.log("calling fro local decrement");
//                 updateLocalStorageCart(updatedCart);
//             }
//         }
//     };

//     // Function to send quantity update to server
//     const sendQuantityUpdateToServer = (body) => {
//         axiosPublic.post("/update-cart/", body)
//             .then(res => {
//                 if (res.data.status_code === 200) {
//                     toast.success(`Product Quantity Updated`, {
//                         style: { border: '1px solid #EE2761', padding: '16px', color: '#EE2761' },
//                         iconTheme: { primary: '#EE2761', secondary: '#FFFAEE' },
//                     });
//                 } else {
//                     toast.error(`Something Went Wrong`, {
//                         style: { border: '1px solid #EE2761', padding: '16px', color: '#EE2761' },
//                         iconTheme: { primary: '#EE2761', secondary: '#FFFAEE' },
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.error(err);
//                 toast.error(`Error updating product quantity`, {
//                     style: { border: '1px solid #EE2761', padding: '16px', color: '#EE2761' },
//                     iconTheme: { primary: '#EE2761', secondary: '#FFFAEE' },
//                 });
//             });
//     };

//     // Function to calculate totals
//     const calculateTotals = (cart) => {
//         const totalOldPrice = cart.reduce((acc, item) => acc + (item.old_price * item.quantity), 0);
//         const totalNewPrice = cart.reduce((acc, item) => acc + (item.new_price * item.quantity), 0);
//         const totalSavings = totalOldPrice - totalNewPrice;
//         return { totalOldPrice, totalNewPrice, totalSavings };
//     };

//     const { totalOldPrice, totalNewPrice, totalSavings } = calculateTotals(cartData);

//     // Render loading spinner if data is loading
//     if (isLoading) {
//         return <Spinner />;
//     }


//     return (
//         <div className="max-w-[85rem] mx-auto px-3">
//             <section className="bg-white mb-8 font-cinzel">
//                 <div className="px-4 2xl:px-0">
//                     <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//                         <div className="mx-auto md:w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//                             <div className="space-y-3">
//                                 {cartData?.length > 0 ? cartData.map((cart, idx) => (
//                                     <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-3">
//                                         <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//                                             <Image width={500} height={400} className="md:h-32 md:w-32 rounded-md mx-auto"
//                                                 src={cart.image_url}
//                                                 alt="Product Image" />
//                                             <div className="flex items-center justify-between md:order-3 md:justify-end">
//                                                 <div className="join join-horizontal border border-red-400 rounded-md">
//                                                     <button onClick={() => handleItemDecrement(idx, cart)}
//                                                         className="btn btn-sm join-item text-xl  text-primaryColor">
//                                                         <svg xmlns="http://www.w3.org/2000/svg"
//                                                             viewBox="0 0 20 20" fill="currentColor"
//                                                             className="w-4 h-4 stroke-current">
//                                                             <path fillRule="evenodd"
//                                                                 d="M4 10a1 1 0 011-1h10a1 1 0 010 2H5a1 1 0 01-1-1z"
//                                                                 clipRule="evenodd" />
//                                                         </svg>
//                                                     </button>
//                                                     <button className="btn btn-sm join-item ">
//                                                         {cart?.quantity}
//                                                     </button>
//                                                     <button onClick={() => handleItemIncrement(idx, cart)}
//                                                         className="btn btn-sm join-item text-xl text-primaryColor">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
//                                                             fill="currentColor" className="w-4 h-4 stroke-current">
//                                                             <path fillRule="evenodd"
//                                                                 d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//                                                                 clipRule="evenodd" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                                 <div className="text-end md:order-4 md:w-32">
//                                                     <div className="">
//                                                         <del className="text-base font-bold text-gray-400">
//                                                             $ {cart.old_price}
//                                                         </del>
//                                                         <p className="text-xl font-bold text-primaryColor">
//                                                             $ {cart.new_price}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
//                                                 <p className="text-lg font-semibold text-gray-700 hover:underline">
//                                                     {cart.title} || ({cart.dimension})
//                                                 </p>
//                                                 <div className="flex items-center gap-4">
//                                                     <button type="button"
//                                                         className="inline-flex items-center text-sm font-medium 
//                                                     text-green-400 hover:text-green-600 hover:underline active:scale-95">
//                                                         <svg className="me-1.5 h-5 w-5"
//                                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
//                                                             fill="none" viewBox="0 0 24 24">
//                                                             <path stroke="currentColor" strokeLinecap="round"
//                                                                 strokeLinejoin="round"
//                                                                 strokeWidth="2"
//                                                                 d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 
//                                                                 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
//                                                         </svg>
//                                                         Add to Favorites
//                                                     </button>
//                                                     <button type="button"
//                                                         onClick={() => removeFromCart(idx, cart)}
//                                                         className="inline-flex items-center text-sm font-medium text-red-400
//                                                          hover:text-red-600 hover:underline active:scale-95">
//                                                         <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
//                                                             width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
//                                                                 strokeWidth="2"
//                                                                 d="M6 18L18 6M6 6l12 12" />
//                                                         </svg>
//                                                         Remove
//                                                     </button>
//                                                     <p className=" font-bold text-primaryColor">
//                                                         Total:  $ {cart.new_price * cart.quantity}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )) : (
//                                     <div className="font-cinzel font-semibold text-gray-700 text-2xl text-center border-2 py-32 rounded-md">


//                                         <>
//                                             <h3>Your Cart is Empty</h3>
//                                             <Link href={"/"} className="flex justify-center mt-6">
//                                                 <button className="btn btn-outline px-10 rounded-md text-[#f15281] hover:bg-[#f03d71] hover:border-none" aria-label="Continue Shopping">
//                                                     Continue Shopping
//                                                     <MdArrowRightAlt className="text-2xl" />
//                                                 </button>
//                                             </Link>
//                                         </>

//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         {/* Additional cart details */}
//                         <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
//                             {/* Promo code form */}
//                             <div className="space-y-4 rounded-lg bg-zinc-100 p-4 shadow-sm sm:p-6">
//                                 <form className="space-y-4">
//                                     <label htmlFor="voucher" className="mb-2 block text-lg font-medium text-gray-800">Do you have a Voucher or Promo?</label>
//                                     <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="Write your Promo Code here" required />
//                                     <div className="flex justify-center">
//                                         <button className="btn btn-outline px-10 rounded-md w-full text-[#f15281] hover:bg-[#f03d71] hover:border-none" aria-label="Apply Promo Code">
//                                             Apply Promo
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                             {/* Order summary */}
//                             <div className="space-y-4 rounded-lg bg-zinc-100 p-4 shadow-sm sm:p-6">
//                                 <p className="text-xl font-semibold text-gray-700">Order summary</p>
//                                 <div className="space-y-4">
//                                     <table className="rounded-xl w-full divide-y  divide-gray-200 border border-gray-200">

//                                         <tbody className="bg-zinc-50 divide-y divide-gray-200">
//                                             <tr>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                      font-normal text-gray-500">
//                                                     Original price
//                                                 </td>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base 
//                                                     font-medium text-gray-900 text-right">
//                                                     ${totalOldPrice}</td>
//                                             </tr>
//                                             <tr>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                       font-normal text-gray-500">
//                                                     Savings
//                                                 </td>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                      font-semibold text-green-500 text-right">
//                                                     $ {totalSavings}
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                  font-normal text-gray-500">
//                                                     Store Pickup
//                                                 </td>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                  font-medium text-gray-900 text-right">
//                                                     $ 100
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base 
//                                                      font-normal text-gray-500">
//                                                     Tax
//                                                 </td>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                         font-medium text-gray-900 text-right">
//                                                     $ 0
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                  font-bold text-gray-900 border-t border-gray-200 pt-2">
//                                                     Total
//                                                 </td>
//                                                 <td
//                                                     className="px-6 py-4 whitespace-nowrap text-base
//                                                  font-bold text-gray-900 text-right border-t
//                                                   border-gray-200 pt-2">$ {totalNewPrice + 100}
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>


//                                 {/* Checkout buttons */}
//                                 <div className="flex justify-center">
//                                     <button className="btn rounded-md w-full hover:bg-[#ee2761] bg-[#f03d71] text-white" aria-label="Proceed to Checkout">
//                                         Proceed to Checkout
//                                     </button>
//                                 </div>
//                                 <div className="divider">OR</div>
//                                 <Link href={"/"} className="flex justify-center">
//                                     <button className="btn btn-outline px-10 rounded-md w-full text-[#f15281] hover:bg-[#f03d71] hover:border-none" aria-label="Continue Shopping">
//                                         Continue Shopping
//                                         <MdArrowRightAlt className="text-2xl" />
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* Wishlist section */}
//             <div className="xl:mt-8">
//                 <h3 className="text-2xl px-4 font-semibold text-gray-800">Wish List Collection</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:mt-8">
//                     {cartData?.slice(0, 8).map((item, idx) => (
//                         <Card key={idx} item={item} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyShoppingCart;




// *********************************************************************************************************

