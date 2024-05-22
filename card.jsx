<div
    className='p-4 w-80 md:w-full border cardLayout shadow-xl mx-auto'>
    <figure className='relative '>
        <div className=' w-full  h-52 mb-16 cardLayout  bg-[#eee8e094]'>
        </div>
        <div className='absolute top-0  left-4'>
            <Image
                src={"https://i.ibb.co/sbPyHCL/Radiant-Glow-Foundation.png"}
                alt='Featured Product'
                className=' '
                width={250} height={150}
            />
        </div>
    </figure>
    <div className='space-y-2'>
        <h4 className='text-lg font-semibold text-gray-700'>This is the titile</h4>
        <section >
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='text-lg md:text-xl xl:text-3xl font-semibold text-red-500'>$50</p>
                    <del className='text-xs md:text-sm xl:text-xl font-semibold text-gray-600'>$40</del>
                </div>
                <div className='flex gap-1 '>
                    <div className='flex items-center gap-1'>
                        <FaStar className='text-sm text-orange-400' />
                        <span className=' font-semibold text-gray-600'>4.8</span>
                    </div>
                    <span className='text-gray-400 font-semibold'>102 Reviews</span>
                </div>
            </div>
        </section>
        <section className='flex  justify-between '>
            <button className='btn  btn-sm btn-outline w-[70%]'>Add To Cart</button>
            <button className="btn btn-sm 
                                hover:border-black bg-black text-white
                                 hover:bg-white hover:text-black px-3 ">
                <FaBasketShopping className='text-2xl' />
            </button>
        </section>
    </div>
</div>