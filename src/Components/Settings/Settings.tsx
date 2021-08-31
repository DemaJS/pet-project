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
import Card from "@material-ui/core/Card";
import {updateProfileThunk} from "../../Reducers/Profile-reducer";
import {ErrorSnackbar} from "../Utils/Error-Component";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../State/Store";
import Alert from "@material-ui/lab/Alert";


type contactsType = {
    github: string
    facebook: string
    website: string
}

type valuesType = {
    aboutMe: string
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
}

export const Settings = () => {

    const dispatch = useDispatch()
    const login = useSelector<AppStateType, string | null>((state) => state.auth.login)

    const validate = (values:valuesType) => {
        const errors = {} as valuesType;

        if (!values.aboutMe) {
            errors.aboutMe = 'Required';
        } else if (values.aboutMe.length > 15) {
            errors.aboutMe = 'Must be 15 characters or less';
        }


       /* if (values.contacts.facebook === '') {
            debugger
            errors.contacts.facebook = 'Required';
            console.log(errors.contacts.facebook)
        } else if (/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*!/i.test(values.contacts.facebook)) {
            errors.contacts.facebook = 'Invalid email address';
        }*/

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            aboutMe: '',
            lookingForAJobDescription: '',
            fullName: '',
            contacts: {
                github: '',
                facebook: '',
                website: '',
            }
        },
        validate,
        onSubmit: (values: valuesType) => {
            console.log(values)
            dispatch(updateProfileThunk(values))
            formik.resetForm()
        },
    });

    if (!login) {
        return <Redirect to="/login"/>
    }

    return (
        <Grid container justify="center">
            <ErrorSnackbar/>
            <Grid item xs={12} lg={5}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth>
                        <FormLabel>
                            <h2>Change description</h2>
                        </FormLabel>
                        <Card
                            style={{
                                margin:'10px',
                                padding: '20px',
                                marginBottom: '10px',
                                borderRadius: '20px',
                                backgroundColor: '#f3f2ef'
                            }}
                            elevation={2}>
                            <FormGroup>
                                <FormControlLabel
                                    label={'Looking for a job'}
                                    control={<Checkbox/>}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    size='small'
                                    label="about me"
                                    margin="normal"
                                    name="aboutMe"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.aboutMe}
                                />
                                {formik.touched.aboutMe && formik.errors.aboutMe ? (
                                    <Alert severity="error">{formik.errors.aboutMe}</Alert>
                                ) : null}
                                <TextField
                                    size='small'
                                    label="skills"
                                    margin="normal"
                                    name="lookingForAJobDescription"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lookingForAJobDescription}
                                />
                                <TextField
                                    size='small'
                                    label="name"
                                    margin="normal"
                                    name="fullName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullName}
                                />
                                <TextField
                                    size='small'
                                    label="github"
                                    margin="normal"
                                    name="contacts.github"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contacts.github}
                                />

                                <TextField
                                    size='small'
                                    label="facebook"
                                    margin="normal"
                                    name="contacts.facebook"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contacts.facebook}
                                />
                                <TextField
                                    size='small'
                                    label="website"
                                    margin="normal"
                                    name="contacts.website"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contacts.website}
                                />
                                <Button size={"medium"} type={'submit'} variant={'outlined'}
                                        color={'primary'}>Save</Button>
                            </FormGroup>
                        </Card>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    );
};