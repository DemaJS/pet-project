import React from "react";
import {useFormik} from "formik";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../Reducers/Auth-reducer";
import img from './../../Images/welcome.jpg'
import {AppStateType} from "../../State/Store";
import {Redirect} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';


type initialValues = {
    password:string
    email:string
}


export const SignupForm = () => {

    const dispatch = useDispatch()

    const validate = (values:initialValues) => {
        const errors = {} as initialValues;

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 15) {
            errors.password = 'Must be 15 characters or less';
        }


        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            dispatch(loginThunk(values.email, values.password))
        },
    });


    const login = useSelector<AppStateType, string | null>((state) => state.auth.login)

    if(login) {
        return <Redirect to="/profile" />
    }

    return (
        <Grid container justify="center" spacing={2} >
            <Grid item xs={12} lg={6}>
                    <img src={img} style={{maxWidth:'100%'}}/>
            </Grid>
            <Grid item>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl style={{marginLeft:'20px'}}>
                        <FormLabel>
                            <p>To log in get registered{' '}
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />

                            {formik.touched.email && formik.errors.email ? (
                               <Alert severity="error">{formik.errors.email}</Alert>
                            ) : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <Alert severity="error">{formik.errors.password}</Alert>
                            ) : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    );
};