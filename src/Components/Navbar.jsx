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

const Navbar = ({ toggleMenu }) => {

    const { user, logout, custData } = UserState();
    const { apiPost, apiPostFile } = apiFunctions();
    const { profile } = allApis();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [open, setOpen] = useState(false);
    const [passOpen, setPassOpen] = useState(false)
    const [errors, setErrors] = useState({})
    const [passWords, setPasswords] = useState({})

    const handleLogout = async () => {

        const res = await apiPost(profile.logout);
        if (res.success) {
            logout();
        }
    }

    const AllFields = [
        { error: errors.current_password, type: 'password', placeholder: 'Enter Current Password', errorText: errors.current_password, label: "Current Password", value: passWords?.current_password || '', onChange: (e) => setPasswords({ ...passWords, current_password: e.target.value }) },
        { error: errors.new_password, type: 'password', placeholder: 'Enter New Password', errorText: errors.new_password, label: "New Password", value: passWords?.new_password || '', onChange: (e) => setPasswords({ ...passWords, new_password: e.target.value }) },
    ]

    const handlePass = async () => {
        const newErrors = {};

        const sixDigitRegex = /^\d{6}$/;

        if (!passWords.current_password) {
            newErrors.current_password = 'Current password is required';
        } else if (!sixDigitRegex.test(passWords.current_password)) {
            newErrors.current_password = 'Current password must be exactly 6 digits';
        }

        if (!passWords.new_password) {
            newErrors.new_password = 'New password is required';
        } else if (!sixDigitRegex.test(passWords.new_password)) {
            newErrors.new_password = 'New password must be exactly 6 digits';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {

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
    }

    // const { usermemberColumns } = Columns();

    // console.log(usermemberColumns({ active: 'member' }))

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
            <CommanModel open={passOpen} onClose={() => setPassOpen(false)} title='Password Update'>
                <div className="grid grid-cols-1 gap-5 py-3">
                    {AllFields.map((list, i) => (
                        <React.Fragment key={i}>
                            <LableInput {...list} />
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex flex-row justify-center place-items-center gap-5 mt-5">
                    <Button variant="contained" color="error" onClick={() => setPassOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handlePass}>Done</Button>
                </div>
            </CommanModel>
        </>
    )
}

export default Navbar
