import React from 'react'
import CommanModel from './CommanModel'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Button } from '@mui/material'

const DeleteAlertModel = ({ open, onClose, deleteClick }) => {
    return (
        <CommanModel open={open} onClose={onClose} submit={deleteClick}>
            <div className="flex flex-col gap-3 justify-center place-items-center font-medium">
                <span className='bg-red-700 text-white rounded-full aspect-square w-20 h-20 flex justify-center place-items-center text-5xl'><RiDeleteBin6Line /></span>
                <span>Are You Sure ?</span>
                <span>You Will not able  to recover this Data</span>
            </div>
        </CommanModel>
    )
}

export default DeleteAlertModel
