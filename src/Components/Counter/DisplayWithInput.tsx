import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import {InputComponent} from "./InputComponent";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {useDispatch} from "react-redux";
import {setValueAC} from "../../Reducers/Counter-reducer";
import CardHeader from "@material-ui/core/CardHeader";


export function DisplayWithInput() {

    const dispatch = useDispatch()

    const onSetValuesFromStorage = () => {

        let value = localStorage.getItem('startValue')
        if (value) {
            let valueAsNumber = JSON.parse(value)
            dispatch(setValueAC(valueAsNumber))
        }
    }

    const styleCard = {
        backgroundColor: '#f3f2ef',
        borderRadius: '15px',
    }

    return (
        <Card elevation={2} style={styleCard}>
            <CardHeader title='Counter'/>
            <CardContent>
                <InputComponent/>
            </CardContent>
            <CardActions>
                <Button
                    style={{borderRadius: '15px'}}
                    onClick={onSetValuesFromStorage}
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<SaveAltIcon/>}>
                    Save
                </Button>
            </CardActions>
        </Card>
    )
}