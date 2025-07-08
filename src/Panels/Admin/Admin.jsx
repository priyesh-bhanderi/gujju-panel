import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { apiFunctions } from '../../Apis/apiFunctions';
import { allApis } from '../../Apis/Apis';
import { UserState } from '../../Context/Usercontext';
import Dashboard from '../pages/Dashboard';
import Sidebar from '../../Components/Sidebar';
import { LuLayoutDashboard } from 'react-icons/lu';
import { GoProjectSymlink } from 'react-icons/go';
import Projects from '../pages/Projects';

const Admin = ({ role }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    const links = [
        {
            name: "Dashboards", to: "/dashboard", role: role,
            icon: LuLayoutDashboard
        },
        {
            name: "Projects", to: "/projects", role: role,
            icon: GoProjectSymlink
        },
    ]


    return (
        <>
            <Navbar toggleMenu={toggleMenu} />
            <div className="flex h-[92vh] overflow-hidden scroll bg-gray-300/40">
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-all duration-300 ease-out ${isExpanded ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={toggleMenu}
                ></div>
                <div
                    className={` text-black bg-white shadow-md z-50 fixed lg:static flex-shrink-0 scroll overflow-hidden transition-all duration-300 ease-in-out h-full scroll ${isExpanded ? "translate-x-0 w-64 lg:w-20" : "lg:translate-x-0 -translate-x-full w-64 lg:w-1/6"
                        } overflow-y-auto`}
                >
                    <Sidebar
                        isExpanded={isExpanded}
                        toggleMenu={toggleMenu}
                        links={links}
                    />
                </div>
                <div className="md:p-6 p-2 h-[92vh] overflow-y-auto w-full">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Admin
