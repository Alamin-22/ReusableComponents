<div className="flex justify-center w-full" >
    <div className="dropdown dropdown-left dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 rounded-full bg-transparent border-none shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 " viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

            <li>
                <button aria-label='Delete User Button' >
                    <LuClipboardEdit className="text-green-600 text-xl active:scale-95" />
                    Edit
                </button>
            </li>
            <li>
                <button aria-label='Delete User Button' onClick={() => handleDeleteUser(user)}>
                    <MdDeleteForever className="text-red-600 text-xl active:scale-95" />
                    Delete
                </button>
            </li>


        </ul>
    </div>
</div>