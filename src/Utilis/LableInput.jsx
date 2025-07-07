import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'

const LableInput = ({ type, label, value, onChange, error, errorText, options, multiline, minRows, placeholder }) => {

    const [pass, setPass] = useState({})

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file, URL.createObjectURL(file))
        }
    }

    return (
        <div>
            {type == 'password' ?
                <FormControl fullWidth variant="outlined" error={error}>
                    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
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
