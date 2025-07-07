import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const CommanModel = ({ open, onClose, title, children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            {title &&
                <DialogTitle sx={{ m: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        edge="end"
                        size="small"
                        sx={{ ml: 2 }}
                    >
                        <RxCross2 />
                    </IconButton>
                </DialogTitle>
            }
            <DialogContent>{children}</DialogContent>
        </Dialog>
    )
}

export default CommanModel

{/* <CommanModel open={open} onClose={() => setOpen(!open)} title='Add Society'>
                <h1>hello</h1>
            </CommanModel> */}