import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import { allApis } from '../Apis/Apis'
import { apiFunctions } from '../Apis/apiFunctions'

const LableInput = ({ type, label, value, onChange, error, errorText, options, multiline, minRows, placeholder }) => {

    const { images } = allApis();
    const { apiPostFile } = apiFunctions();


    const handleImage = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file)

        const res = await apiPostFile(images.upload, formData)
        if (res.status) {
            onChange(res.data, res.data)
        }
    }

    const [pass, setPass] = useState({})
    const [password, setPassword] = useState(new Array(6).fill(''));
    const fileInputRef = useRef(null);
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return; // Only allow single digit

        const newPass = [...password];
        newPass[index] = value;
        setPassword(newPass);

        // Move to next input if value entered
        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newPass = [...password];
            if (password[index]) {
                newPass[index] = '';
                setPassword(newPass);
            } else if (index > 0) {
                inputsRef.current[index - 1].focus();
                const prevPass = [...password];
                prevPass[index - 1] = '';
                setPassword(prevPass);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (type == '6password') {
            onChange(password.join(""))
        }
    }, [password])

    return (
        <div>
            {type == '6password' ?
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className='text-sm md:text-base'>Password</label>
                    <div className="grid grid-cols-6 gap-4 w-full">
                        {password.map((digit, i) => (
                            <input
                                // disabled={loading}
                                key={i}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                ref={(el) => (inputsRef.current[i] = el)}
                                className="w-full h-full aspect-square text-center text-lg border-2 rounded-lg focus:outline-none focus:border-black"
                            />
                        ))}
                    </div>
                    {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
                </div>
                :
                type == 'password' ?
                    <FormControl fullWidth variant="outlined" error={error}>
                        <InputLabel htmlFor={`outlined-adornment-password${label}`}>{label}</InputLabel>
                        <OutlinedInput
                            id={`outlined-adornment-password${label}`}
                            type={pass[label] ? 'text' : 'password'}
                            onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            pass[label] ? 'hide the password' : 'display the password'
                                        }
                                        onClick={() => setPass({ [label]: !pass[label] })}
                                        edge="end"
                                    >
                                        {pass[label] ? <IoMdEyeOff /> : <IoMdEye />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label={label}
                        />
                        {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
                    </FormControl>
                    :
                    type == 'file' ?
                        value ?
                            <div className="relative w-24 h-24 aspect-square">
                                <img src={value} alt="" className='border rounded h-full' />
                                <button onClick={handleClick} className='absolute top-0 -translate-y-1/2 -right-0 translate-x-1/2 text-white rounded-full h-7 w-7 text-xl aspect-square bg-blue-600 flex justify-center place-items-center'><MdEdit /></button>
                                <input ref={fileInputRef} type="file" name="" accept="image/*" id="" onChange={handleImage} className='hidden' />
                            </div>
                            :
                            <div className="flex flex-col h-full">
                                <input ref={fileInputRef} type="file" name="" accept="image/*" id="" onChange={handleImage} className={`border w-full ${error ? 'border-red-600 text-red-600' : 'border-neutral-400/70'} h-full rounded pt-3 ps-3 pb-3`} />
                                {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
                            </div>
                        :
                        type == 'select' ?
                            <FormControl fullWidth error={error}>
                                <InputLabel id={label}>{label}</InputLabel>
                                <Select
                                    labelId={label}
                                    id="demo-simple-select"
                                    label={label}
                                    value={value}
                                    onChange={onChange}
                                >
                                    {options?.map((type, i) => (
                                        <MenuItem key={i} value={type.value}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errorText && <p className="text-red-500 text-sm mt-1">{errorText}</p>}
                            </FormControl>
                            :
                            <TextField
                                type={type}
                                error={error}
                                multiline={multiline}
                                minRows={minRows}
                                helperText={errorText}
                                label={label}
                                placeholder={placeholder}
                                value={value || ''}
                                onChange={onChange}
                                fullWidth
                            />
            }
        </div>
    )
}

export default LableInput
