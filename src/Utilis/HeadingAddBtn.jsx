import React from 'react'

const HeadingAddBtn = ({ title, addClick, addTitle }) => {
    return (
        <div className='flex flex-row justify-between place-items-center gap-5'>
            <h1 className='xl:text-2xl md:text-xl text-lg font-medium capitalize'>{title}</h1>
            {addClick &&
                <button onClick={addClick} className='text-base px-2 py-1 rounded-lg bg-blue-500 text-white font-medium'>{addTitle}</button>
            }
        </div>
    )
}

export default HeadingAddBtn
