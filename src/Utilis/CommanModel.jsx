import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const CommanModel = ({ open, onClose, title, children ,submit}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
            <DialogContent>
            {children}
            <div className="flex flex-row justify-center place-items-center gap-5 mt-10">
                <Button variant="contained" onClick={onClose} color="error">Cancel</Button>
                <Button variant="contained" onClick={submit}>Done</Button>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommanModel

{/* <CommanModel open={open} onClose={() => setOpen(!open)} title='Add Society'>
                <h1>hello</h1>
            </CommanModel> */}