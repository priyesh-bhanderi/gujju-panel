import React, { useEffect, useState } from 'react'
import { allApis } from '../../Apis/Apis'
import { apiFunctions } from '../../Apis/apiFunctions';
import { UserState } from '../../Context/Usercontext';
import Columns from '../../Utilis/Columns';
import HeadingAddBtn from '../../Utilis/HeadingAddBtn';
import TableUi from '../../Utilis/TableUi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../Context/ToastProvider';
import CommanModel from '../../Utilis/CommanModel';
import AllInputs from '../../Utilis/AllInputs';
import LableInput from '../../Utilis/LableInput';

const Projects = () => {

    const { project } = allApis();
    const { apiGet, apiPost, apiPostFile, apiDelete } = apiFunctions();
    const { user } = UserState();
    const { projectsColumns } = Columns();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { getFormFields, validateForm, data, setData, setErrors } = AllInputs('project');

    const [all, setAll] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null)

    const getData = async ({ status, msg }) => {
        const res = await apiGet(project.list);
        if (res.status) {
            setAll(res.data)
            if (status) {
                showToast(msg, 'success');
            }
        }
    }

    useEffect(() => {
        if (user) {
            getData({ status: false });
        }
    }, [user])

    const handleStatus = async (id, status) => {
        const res = await apiPost(project.status(id), { status })
        if (res.status) {
            getData({ status: true, msg: 'Status Update SuccessFully' });
        }
    }

    const ctgOptions = [
        { name: 'App', value: "app" },
        { name: 'Web', value: "web" },
        { name: 'Figma', value: "figma" },
    ]

    const handleSubmit = async () => {

        if (!validateForm()) return;
        let url;
        if (id) {
            url = project.update(id)
        } else {
            url = project.add
        }
        const payload = {
            ...data,
            status: "0"
        }
        const res = await apiPost(url, payload);
        if (res.status) {
            getData({ status: true, msg: `Project ${id ? 'Update' : 'Add'} SuccessFully` });
            setOpen(false)
        }
    }

    const handleDelete = async (id) => {
        const res = await apiDelete(project.delete(id));
        if (res.status) {
            getData({ status: true, msg: 'Project Delete SuccessFully' });
        }
    }

    const handleEdit = (row) => {
        setId(row.id)
        setData({
            ...row, file: row.image
        })
        setOpen(true)
    }

    return (
        <>
            <HeadingAddBtn title='Projects' addClick={() => setOpen(true)} addTitle='Add New' />
            <div className="mt-5 md:p-5 p-2 bg-white rounded-lg shadowAll">
                <TableUi columns={projectsColumns()} rows={all} statusClick={(row) => handleStatus(row.id, row.status == 1 ? 0 : 1)} editClick={(row) => handleEdit(row)} deleteClick={(row) => handleDelete(row.id)} viewClick={(row) => window.open(row.link, '_blank')} />
                <CommanModel title={`${id ? 'Update' : 'Add'} Project`} open={open} onClose={() => { setOpen(false), setErrors({}), setData({}) }} submit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-5 py-2">
                        {getFormFields(ctgOptions).map((list, i) => (
                            <div key={i} className={`${(i == 4 || i == 5) ? 'col-span-2' : ''}`}>
                                <LableInput {...list} />
                            </div>
                        ))}
                    </div>
                </CommanModel>
            </div>
        </>
    )
}

export default Projects
