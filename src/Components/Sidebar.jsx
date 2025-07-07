import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserState } from '../Context/Usercontext'
import { MdLogout } from 'react-icons/md';
import { apiFunctions } from '../Apis/apiFunctions';
import { allApis } from '../Apis/Apis';

const Sidebar = ({ isExpanded, toggleMenu, links }) => {

    const { user, logout } = UserState();
    const { apiPost } = apiFunctions();
    const { profile } = allApis();

    const change = () => {
        if (window.innerWidth <= 999) toggleMenu()
    }

    const handleLogout = async () => {

        const res = await apiPost(profile.logout);
        if (res.success) {
            logout();
        }
    }

    return (
        <div className="px-3 pt-5 space-y-3">
            {links.map((list, index) => (
                <NavLink
                    to={"/" + list.role + list.to}
                    key={index}
                    onClick={change}
                    className={({ isActive }) =>
                        `${isActive || (list.to === '/dashboard' && window.location.pathname === `/${user?.role}`) ? 'bg-blue-400 font-semibold text-white' : 'hover:bg-blue-100 text-gray-700'} 
                         ${isExpanded ? 'lg:justify-center' : ''} flex flex-row gap-3 rounded-md px-3 py-2 transition duration-300 ease-in-out`
                    }
                >
                    <list.icon className="text-xl" />
                    {!isExpanded && <span className="text-sm font-medium">{list.name}</span>}
                    {isExpanded && <span className="text-sm font-medium lg:hidden">{list.name}</span>}
                </NavLink>
            ))}
            <button onClick={handleLogout} className={`${isExpanded ? 'lg:justify-center' : ''} w-full hover:bg-blue-100 text-gray-700 flex flex-row place-items-center gap-3 rounded-md px-3 py-2 transition duration-300 ease-in-out`}>
                <h6 className='text-xl'><MdLogout /></h6>
                {!isExpanded && <span className="text-sm font-medium">Logout</span>}
                {isExpanded && <span className="text-sm font-medium lg:hidden">Logout</span>}
            </button>
        </div>
    )
}

export default Sidebar
