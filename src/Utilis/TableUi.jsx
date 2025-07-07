import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteAlertModel from './DeleteAlertModel';
import { TiArrowSync } from 'react-icons/ti';
import { MdLockOutline } from 'react-icons/md';
import CommanModel from './CommanModel';
import LableInput from './LableInput';

const TableUi = ({ notData, columns, rows, pagination, editClick, deleteClick, passClick, viewClick }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [deleteData, setDeleteData] = useState(null);
    const [passOpen, setPassOpen] = useState(null);
    const [passWords, setPasswords] = useState({});
    const [errors, setErrors] = useState({})
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = rows?.filter((row) =>
        columns.some((column) => {
            const value = row[column.field];
            return value?.toString().toLowerCase().includes(searchQuery);
        })
    );

    const paginatedData = pagination
        ? filteredData?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        : filteredData;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setPassOpen(null)
        setDeleteData(null);
        setPage(1);
    }, [rows, searchQuery]);

    const AllFields = [
        { error: errors.password, type: 'password', placeholder: 'Enter Password', errorText: errors.password, label: "Password", value: passWords?.password || '', onChange: (e) => setPasswords({ ...passWords, password: e.target.value }) },
        { error: errors.cpassword, type: 'password', placeholder: 'Enter Confirm Password', errorText: errors.cpassword, label: "Confirm Password", value: passWords?.cpassword || '', onChange: (e) => setPasswords({ ...passWords, cpassword: e.target.value }) },
    ]

    const handlePass = () => {
        const newErrors = {};
        const sixDigitRegex = /^\d{6}$/;
        if (!passWords.password) {
            newErrors.password = "Password is required";
        } else if (!sixDigitRegex.test(passWords.password)) {
            newErrors.password = "Password must be a 6-digit number";
        }

        if (!passWords.cpassword) {
            newErrors.cpassword = "Confirm Password is required";
        } else if (passWords.cpassword !== passWords.password) {
            newErrors.cpassword = "Passwords do not match";
        } else if (!sixDigitRegex.test(passWords.cpassword)) {
            newErrors.cpassword = "Confirm Password must be a 6-digit number";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            passClick(passOpen, passWords)
            setErrors({})
        }
    }

    return (
        <div className='flex flex-col gap-5 capitalize text-nowrap'>
            <input
                type="search"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                value={searchQuery}
                className='w-64 px-2 py-2 rounded-lg focus:outline-none border-2 focus:border-black'
                placeholder='Search...'
            />

            <TableContainer >
                <Table >
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell key={i} style={{ minWidth: 200, fontWeight: 700 }}>
                                    {column.name}
                                </TableCell>
                            ))}
                            {(editClick || deleteClick || passClick) && (
                                <TableCell style={{ fontWeight: 700 }}>Actions</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(paginatedData?.length > 0 ? paginatedData : []).map((row, i) => (
                            <TableRow hover key={i}>
                                {columns.map((col, j) => (
                                    <TableCell key={j} onClick={() => viewClick(row)} className={`line-clamp-1 cursor-pointer ${viewClick ?'cursor-pointer':''}`}>
                                        {col.renderCell ? col.renderCell(row) : row[col.field]}
                                    </TableCell>
                                ))}
                                {(editClick || deleteClick || passClick) && (
                                    <TableCell>
                                        <div className="flex flex-row gap-4 place-items-center">
                                            {passClick && (
                                                <Button
                                                    onClick={() => setPassOpen(row.id)}
                                                    sx={{ width: 30, minWidth: 0, color: "green", height: 30, padding: 0, fontSize: 25 }}
                                                >
                                                    <MdLockOutline />
                                                </Button>
                                            )}
                                            {editClick && (
                                                <Button
                                                    sx={{ width: 30, minWidth: 0, height: 30, padding: 0, fontSize: 20 }}
                                                    onClick={() => editClick(row)}
                                                >
                                                    <FiEdit />
                                                </Button>
                                            )}
                                            {deleteClick && (
                                                <Button
                                                    sx={{ width: 30, minWidth: 0, color: "red", height: 30, padding: 0, fontSize: 20 }}
                                                    onClick={() => setDeleteData(row)}
                                                >
                                                    <RiDeleteBin6Line />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                        {paginatedData?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns?.length + 1} className="text-center text-gray-500 py-4">
                                    {notData ? `${notData} ` : 'Data '}Not Available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {pagination && (
                <div className="flex justify-end pt-4">
                    <Pagination
                        count={Math.ceil(filteredData.length / rowsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            )}
            <CommanModel open={passOpen} onClose={() => setPassOpen(null)} title='Password Update'>
                <div className="grid grid-cols-1 gap-5 py-3">
                    {AllFields.map((list, i) => (
                        <React.Fragment key={i}>
                            <LableInput {...list} />
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex flex-row justify-center place-items-center gap-5 mt-5">
                    <Button variant="contained" color="error" onClick={() => setPassOpen(null)}>Cancel</Button>
                    <Button variant="contained" onClick={handlePass}>Done</Button>
                </div>
            </CommanModel>
            <DeleteAlertModel
                open={deleteData}
                onClose={() => setDeleteData(null)}
                deleteClick={() => deleteClick(deleteData)}
            />
        </div>
    );
};

export default TableUi;
