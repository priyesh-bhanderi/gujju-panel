import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { UserState } from '../Context/Usercontext';
import { apiFunctions } from '../Apis/apiFunctions';
import { allApis } from '../Apis/Apis';
import { Button, Menu, MenuItem } from '@mui/material';
import CommanModel from '../Utilis/CommanModel';
import LableInput from '../Utilis/LableInput';
import { useToast } from '../Context/ToastProvider';
import AllInputs from '../Utilis/AllInputs';

const Navbar = ({ toggleMenu }) => {

    const { user, logout, custData } = UserState();
    const { apiPost, apiPostFile } = apiFunctions();
    const { profile } = allApis();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { getFormFields, validateForm } = AllInputs('change-password');

    const [open, setOpen] = useState(false);
    const [passOpen, setPassOpen] = useState(false)
    const [passWords, setPasswords] = useState({})

    const handleLogout = async () => {

        const res = await apiPost(profile.logout);
        if (res.success) {
            logout();
        }
    }

    const handlePass = async () => {
        if (!validateForm(passWords)) return;
        const formData = new FormData();
        Object.keys(passWords).forEach(key => {
            formData.append(key, passWords[key]);
        });

        const res = await apiPostFile(profile.changePassword, formData, true);
        if (res.success) {
            setPassOpen(false)
            showToast(`Password Update Successfully`)
        }
    }


    return (
        <>
            <div className="bg-white shadow-md sticky top-0 z-40 flex items-center justify-between px-4 gap-5 md:px-6 lg:px-10 h-[8vh]">
                <div className="flex  place-items-center md:gap-5 gap-3">
                    <button onClick={toggleMenu} className="text-2xl ">
                        <FiMenu />
                    </button>
                    <Link to={`/${user?.role}`} className='text-2xl font-semibold mb-1 capitalize'>Gujju Panel</Link>
                </div>
                <div className="flex items-center gap-10">
                    {user &&
                        <>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(event) => setOpen(event.currentTarget)}
                                disableRipple
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                <div className="flex flex-row gap-5 place-items-center">
                                    {custData?.image ?
                                        <img loading="lazy" src={custData?.image_path} alt="" className='h-10 w-10 rounded-full object-cover aspect-square' />
                                        :
                                        <img loading="lazy" id="profile_5" src={`https://ui-avatars.com/api/?name=${custData?.name}&size=20`}
                                            className="h-10 w-10 aspact-square rounded-full object-cover" alt="" />
                                    }
                                    <div className="flex flex-col">
                                        <h1 className='text-black font-medium text-base line-clamp-1 capitalize'>{custData?.name}</h1>
                                    </div>
                                </div>
                            </Button>
                            <Menu
                                id="basic-menu"
                                open={open}
                                anchorEl={open}
                                onClick={() => setOpen(false)}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => navigate(`/${user?.role}/my-profile`)}>Profile</MenuItem>
                                <MenuItem onClick={() => setPassOpen(true)}>Change Password</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    }
                </div>
            </div>
            <CommanModel open={passOpen} onClose={() => setPassOpen(false)} title='Password Update' submit={handlePass}>
                <div className="grid grid-cols-1 gap-5 py-3">
                    {getFormFields(passWords, setPasswords).map((list, i) => (
                        <React.Fragment key={i}>
                            <LableInput {...list} />
                        </React.Fragment>
                    ))}
                </div>
            </CommanModel>
        </>
    )
}

export default Navbar
