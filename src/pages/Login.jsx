import React, { useEffect, useRef, useState } from 'react'
import { apiFunctions } from '../Apis/apiFunctions';
import { UserState } from '../Context/Usercontext';
import { TbLoader3 } from 'react-icons/tb';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '../Context/ToastProvider';
import { allApis } from '../Apis/Apis';
import LableInput from '../Utilis/LableInput';
import AllInputs from '../Utilis/AllInputs';

const Login = () => {

    const { loading, setRefresh } = UserState();
    const { apiPost, apiGet } = apiFunctions();
    const { auth } = allApis();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { getFormFields, validateForm } = AllInputs('login');

    const [userData, setUserData] = useState({});

    const handleLogin = async () => {

        if (!validateForm(userData)) return;

        const response = await apiPost(auth?.login, userData, true);
        if (response.status) {
            const userData = {
                role: response.data.role,
                token: response.data.token
            }
            showToast('Login SuccessFully', 'success');
            localStorage.setItem("user", JSON.stringify(userData));
            setRefresh(prev => prev + 1)
        }
    }

    // const AllFields = 

    return (
        <div className='bg-[#ccc] h-dvh flex justify-center place-items-center px-5 md:px-0'>
            <div className="bg-white rounded-lg p-5 flex flex-col gap-5 xl:w-1/4 md:w-1/2 w-full">
                <h6 className='text-xl font-medium'>Login</h6>
                <div className="grid grid-cols-1 gap-5">
                    {getFormFields(userData, setUserData)?.map((list, i) => (
                        <React.Fragment key={i}>
                            <LableInput {...list} />
                        </React.Fragment>
                    ))}
                </div>
                <button onClick={handleLogin} disabled={loading} className='bg-[#797878] rounded-lg py-2 text-white font-medium flex justify-center place-items-center
                 md:text-xl mt-5 [box-shadow:-5px_-5px_9px_rgba(255,255,255,0.45),5px_5px_9px_rgba(94,104,121,0.3)]'>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login
