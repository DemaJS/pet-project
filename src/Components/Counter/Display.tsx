import React, {useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

type propsType = {
    number: number
    setNumber:(number:number) => void
    maxValue:number
    setMaxValue:(number:number) => void
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export function Display(props: propsType) {

    useEffect(() => {
        let maxValue = localStorage.getItem('maxValueKey')
        if(maxValue) {
            let maxValueAsNumber = JSON.parse(maxValue)
            props.setMaxValue(maxValueAsNumber)
        }
    },[props.maxValue])

    const classes = useStyles();

    const style:any = {
        color: 'red',
        textAlign: 'center'
    }


    const onClickHandler = () => {
        if (props.number !== props.maxValue) {
            props.setNumber(props.number + 1)
        }
    }
    const resetOnClick = () => {
        props.setNumber(0)
    }

    return (
        <Card className={classes.root} >
            <CardActionArea>
                <CardContent>
                    <Typography variant='h3'>
                        {
                            props.number >= props.maxValue ? <h1 style={style}>{props.number}</h1> :
                                <h1 style={{textAlign: 'center'}}>{props.number}</h1>
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    onClick={onClickHandler}
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<AddIcon/>}>
                    INC
                </Button>
                <Button
                    onClick={resetOnClick}
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<RotateLeftIcon/>}>
                    RESET
                </Button>
            </CardActions>
        </Card>
    )
}

