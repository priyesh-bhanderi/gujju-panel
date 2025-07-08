import React from 'react'
import { allApis } from '../Apis/Apis';
import { handledate } from './Handledate';

const Columns = () => {

    const { society, images } = allApis();

    const projectsColumns = () => {
        return [
            { field: 'title', name: 'Image', renderCell: (row) => { return <img src={row.imageUrl} className='h-16 aspect-video'/> } },
            { field: 'title', name: 'Project Name' },
            { field: 'category', name: 'category' },
            { field: 'tools', name: 'Tools' },
            { field: 'status', name: 'status' },
        ]
    }

    return { projectsColumns }
}

export default Columns
