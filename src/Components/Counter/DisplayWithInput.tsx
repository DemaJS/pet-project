import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {InputComponent} from "./InputComponent";
import SaveAltIcon from '@material-ui/icons/SaveAlt';


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

    const [maxValue, setMaxValue] = useState(0)
    const [startValue, setStartValue] = useState(0)

    useEffect(() => {
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
    }, [maxValue, startValue])


    const onSetValuesFromStorage = () => {
        let startValue = localStorage.getItem('startValueKey')
        if (startValue) {
            let valueAsNumber = JSON.parse(startValue)
            props.setNumber(valueAsNumber)
        }
        let maxValue = localStorage.getItem('maxValueKey')
        if(maxValue) {
            let maxValueAsNumber = JSON.parse(maxValue)
            props.setMaxValue(maxValueAsNumber)
        }
    }

    return (
        <Card className={classes.root}>
           <Typography variant='h3'>Counter</Typography>
            <CardContent>
                <InputComponent maxValue={maxValue} startValue={startValue}
                                setMaxValue={setMaxValue} setStartValue={setStartValue}/>
            </CardContent>
            <CardActions>
                <Button
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