import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './DisplayTodo.css';

const DisplayTodo = ({
    isOpen,
    formData,
    handleCloseButton,
    handleEditTodo,
    handleRemoveTodo
}) => {
    return (
        <Dialog onClose={handleCloseButton} open={isOpen}>
            <DialogTitle>
                <div className="display-todo-title">Your Todo</div>
            </DialogTitle>

            <DialogContent>
                <div>
                    <Card sx={{ marginTop: 1}}>
                        
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div" sx={{wordWrap: 'break-word'}}>
                                    {formData.todoName}
                                </Typography>
                                <Divider/>
                                <Typography variant="body1" color="text.secondary" sx={{wordWrap: 'break-word'}}>
                                    {formData.todoNote}
                                </Typography>
                            </CardContent>
                        
                    </Card>
                </div>
            </DialogContent>

            <DialogActions>
                <div className="display-buttons-wrapper">
                    <Button color="secondary" variant="outlined" onClick={handleRemoveTodo}>Remove</Button>

                    <div>
                    <Button color="primary" onClick={handleCloseButton}>Close</Button>
                    <Button color="primary" onClick={handleEditTodo}>Edit</Button>
                    </div>
                </div>
            </DialogActions>
        </Dialog >
    )
}
export default DisplayTodo;