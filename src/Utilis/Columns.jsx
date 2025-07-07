import { Switch } from '@mui/material';
import React from 'react'

const Columns = () => {

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const usermemberColumns = ({ active, handleStatus }) => {
        return [
            {
                field: 'name', name: 'Name', renderCell: (params) => {
                    return <div className="flex flex-row gap-5 place-items-center">
                        {<img src={params.image_path ? params.image_path : images.avatar(params.name)} alt="" className='h-10 w-10 rounded-full aspect-square' />}
                        <div className="flex flex-col gap-1">
                            <span className='text-black font-medium'>{params.name}</span>
                            <span>{params.email}</span>
                        </div>
                    </div>
                }
            },
            { field: 'mobile', name: 'mobile' },
            active == 'user' && { field: 'designation', name: 'designation' },
            active == 'user' && {
                field: 'status', name: 'status', renderCell: (params) => {
                    return (
                        <div className="flex flex-row place-items-center gap-3 w-full">
                            <span className={`${params.status == 1 ? 'bg-green-300/50 text-green-600' : 'bg-red-300/50 text-red-600'} font-medium h-fit px-2 py-0.5 rounded-full`}>{params.status == 1 ? 'active' : 'inactive'}</span>
                            <Switch {...label} checked={params.status == 1} onChange={() => handleStatus(params.id, params.status)} />
                        </div>
                    )
                }
            },
            active == 'member' && { field: 'floor', name: 'floor' },
            active == 'member' && { field: 'ghar_no', name: 'Ghar No' },
            { field: 'wings', name: 'Total Wings | Sheri' },

        ].filter(Boolean)
    }


    return { usermemberColumns }
}

export default Columns
