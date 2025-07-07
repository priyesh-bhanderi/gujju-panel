import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const showToast = useCallback((msg, type = 'success') => {
        setMessage(msg);
        setSeverity(type);
        setOpen(true);
    }, []);

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
            >
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
