import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {logoutThunk} from "../../Reducers/Auth-reducer";
import {useFormik} from "formik";


export function FormDialog() {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        dispatch(logoutThunk())
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });


    // @ts-ignore
    const auth = useSelector<AppStateType, number>((state) => state.auth.isAuth)

    return (

          <form onSubmit={formik.handleSubmit}>
            {
                auth
                    ?
                    <Button variant="outlined" color="default" onClick={handleLogout} startIcon={<ExitToAppIcon/>}>
                        Log out
                    </Button>
                    :
                    <Button variant="outlined" color="default" onClick={handleClickOpen} startIcon={<LockOpenIcon/>}>
                        Log in
                    </Button>
            }

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary" type='submit'>
                            Sign in
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
    );
}


