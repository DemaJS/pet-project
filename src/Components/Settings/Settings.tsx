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
import {useDispatch} from "react-redux";
import Card from "@material-ui/core/Card";
import { updateProfileThunk} from "../../Reducers/Profile-reducer";
import {ErrorSnackbar} from "../Utils/Error-Component";


type contactsType = {
    github: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
}

type valuesType = {
    aboutMe: string
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
}

export const Settings = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            aboutMe: '',
            lookingForAJobDescription: '',
            fullName: '',
            contacts: {
                github: '',
                facebook: '',
                instagram: '',
                twitter: '',
                website: '',
                youtube: ''
            }
        },
        onSubmit: (values:valuesType) => {
            console.log(values)
            dispatch(updateProfileThunk(values))
            formik.resetForm()
        },
    });


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
                            style={{padding: '20px', marginBottom: '10px', borderRadius:'20px',backgroundColor:'#f3f2ef'}}
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
                                    value={formik.values.aboutMe}
                                />
                                <TextField
                                    size='small'
                                    label="skills"
                                    margin="normal"
                                    name="lookingForAJobDescription"
                                    onChange={formik.handleChange}
                                    value={formik.values.lookingForAJobDescription}
                                />
                                <TextField
                                    size='small'
                                    label="name"
                                    margin="normal"
                                    name="fullName"
                                    onChange={formik.handleChange}
                                    value={formik.values.fullName}
                                />
                                <TextField
                                    size='small'
                                    label="github"
                                    margin="normal"
                                    name="contacts.github"
                                    onChange={formik.handleChange}
                                    value={formik.values.contacts.github}
                                />
                                <TextField
                                    size='small'
                                    label="facebook"
                                    margin="normal"
                                    name="contacts.facebook"
                                    onChange={formik.handleChange}
                                    value={formik.values.contacts.facebook}
                                />
                                <TextField
                                    size='small'
                                    label="instagram"
                                    margin="normal"
                                    name="contacts.instagram"
                                    onChange={formik.handleChange}
                                    value={formik.values.contacts.instagram}
                                />
                                <TextField
                                    size='small'
                                    label="twitter"
                                    margin="normal"
                                    name="contacts.twitter"
                                    onChange={formik.handleChange}
                                    value={formik.values.contacts.twitter}
                                />
                                <TextField
                                    size='small'
                                    label="website"
                                    margin="normal"
                                    name="contacts.website"
                                    onChange={formik.handleChange}
                                    value={formik.values.contacts.website}
                                />
                                <TextField
                                    size='small'
                                    label="youtube"
                                    margin="normal"
                                    name="contacts.youtube"
                                    onChange={formik.handleChange}
                                    value={formik.values.contacts.youtube}
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