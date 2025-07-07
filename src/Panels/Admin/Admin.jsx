import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { apiFunctions } from '../../Apis/apiFunctions';
import { allApis } from '../../Apis/Apis';
import { UserState } from '../../Context/Usercontext';
import Dashboard from '../pages/Dashboard';

const Admin = () => {

    const { apiGet } = apiFunctions();
    const { dashboard } = allApis();
    const { user, socRefresh } = UserState();

    const [data, setData] = useState({});
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    const getData = async () => {
        const res = await apiGet(dashboard.get);
        if (res.success) {
            setData(res.data.result)
            setUsers(res.data.user)
            setMembers(res.data.member)
        }
    }

    useEffect(() => {
        if (user) {
            // getData();
        }
    }, [user, socRefresh])

    return (
        <div className='h-screen bg-gray-400/10'>
            <Navbar toggleMenu={toggleMenu} />
            <div className="md:p-6 p-2 h-[92vh] overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin
