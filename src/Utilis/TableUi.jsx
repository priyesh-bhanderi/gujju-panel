import { Button, Pagination, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteAlertModel from './DeleteAlertModel';
import { TiArrowSync } from 'react-icons/ti';
import { MdLockOutline } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';

const TableUi = ({ notData, columns, rows, pagination, editClick, deleteClick, passClick, viewClick, statusClick }) => {

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [searchQuery, setSearchQuery] = useState('');
    const [deleteData, setDeleteData] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = rows?.filter((row) =>
        columns.some((column) => {
            const value = row[column.field];
            return value?.toString().toLowerCase().includes(searchQuery.trim());
        })
    );

    const paginatedData = pagination
        ? filteredData?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        : filteredData;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setDeleteData(null);
        setPage(1);
    }, [rows, searchQuery]);

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
                            {(editClick || deleteClick || passClick || viewClick) && (
                                <TableCell style={{ fontWeight: 700 }}>Actions</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(paginatedData?.length > 0 ? paginatedData : []).map((row, i) => (
                            <TableRow hover key={i}>
                                {columns.map((col, j) => (
                                    <TableCell key={j} className={`line-clamp-1`}>
                                        {col.field == 'status' ?
                                            <div className="flex flex-row place-items-center gap-3 w-full">
                                                <span className={`${row.status == 1 ? 'bg-green-300/50 text-green-600' : 'bg-red-300/50 text-red-600'} font-medium h-fit px-2 py-0.5 rounded-full`}>{row.status == 1 ? 'active' : 'inactive'}</span>
                                                <Switch {...label} checked={row.status == 1} onChange={() => statusClick(row)} />
                                            </div>
                                            : col.renderCell ? col.renderCell(row) : row[col.field]
                                        }
                                    </TableCell>
                                ))}
                                {(editClick || deleteClick || passClick || viewClick) && (
                                    <TableCell>
                                        <div className="flex flex-row gap-4 place-items-center">
                                            {viewClick && (
                                                <Button
                                                    onClick={() => viewClick(row)}
                                                    sx={{ width: 30, minWidth: 0, color: "green", height: 30, padding: 0, fontSize: 25 }}
                                                >
                                                    <IoEyeSharp />
                                                </Button>
                                            )}
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
            <DeleteAlertModel
                open={deleteData}
                onClose={() => setDeleteData(null)}
                deleteClick={() => deleteClick(deleteData)}
            />
        </div>
    );
};

export default TableUi;
