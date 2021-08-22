import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {InputComponent} from "./InputComponent";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {useDispatch} from "react-redux";
import {setMaxValueAC, setStartValueAC, setValueAC} from "../../Reducers/Counter-reducer";
import CardHeader from "@material-ui/core/CardHeader";


const useStyles = makeStyles({
    root: {
        width: 250,
    },
    media: {
        height: 140,
        width: 140
    },
});

type propsType = {
    setNumber: (number: number) => void
    setMaxValue:(number:number) => void
}


export function DisplayWithInput(props: propsType) {

    const classes = useStyles();

    const dispatch = useDispatch()

   /* const [maxValue, setMaxValue] = useState(0)
    const [startValue, setStartValue] = useState(0)*/

    /*useEffect(() => {
        let startValue = localStorage.getItem('startValueKey')
        let maxValue = localStorage.getItem('maxValueKey')
        if (maxValue && startValue) {
            let valueAsNumber = JSON.parse(startValue)
            props.setNumber(valueAsNumber)
            setStartValue(+startValue)
            setMaxValue(+maxValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('maxValueKey', JSON.stringify(maxValue))
        localStorage.setItem('startValueKey', JSON.stringify(startValue))
    }, [maxValue, startValue])*/


    const onSetValuesFromStorage = () => {

        let value = localStorage.getItem('startValue')
        if(value) {
            let valueAsNumber = JSON.parse(value)
            dispatch(setValueAC(valueAsNumber))
        }

        let startValue = localStorage.getItem('startValue')
        if (startValue) {
            let startValueAsNumber = JSON.parse(startValue)
            /*props.setNumber(valueAsNumber)*/
            dispatch(setStartValueAC(startValueAsNumber))
        }

        let maxValue = localStorage.getItem('maxValue')
        if(maxValue) {
            let maxValueAsNumber = JSON.parse(maxValue)
          /*  props.setMaxValue(maxValueAsNumber)*/
            dispatch(setMaxValueAC(maxValueAsNumber))
        }
    }


    const styleCard = {
        backgroundColor:'#f3f2ef',
        borderRadius:'15px',
    }

    return (
        <Card className={classes.root} elevation={2} style={styleCard}>
           <CardHeader title='Counter'/>
            <CardContent>
                <InputComponent />
            </CardContent>
            <CardActions>
                <Button
                    style={{borderRadius:'15px'}}
                    onClick={onSetValuesFromStorage}
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<SaveAltIcon />}>
                    Save
                </Button>
            </CardActions>
        </Card>
    )
}