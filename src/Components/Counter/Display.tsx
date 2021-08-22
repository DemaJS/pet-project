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
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {incValueAC, resetValueAC} from "../../Reducers/Counter-reducer";


type propsType = {
    number: number
    setNumber: (number: number) => void
    maxValue: number
    setMaxValue: (number: number) => void
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

    const value = useSelector<AppStateType, number>((state) => state.counter.value)
    const maxValue = useSelector<AppStateType,number>((state => state.counter.maxValue))
    const dispatch = useDispatch()

    /*useEffect(() => {
        let maxValue = localStorage.getItem('maxValueKey')
        if (maxValue) {
            let maxValueAsNumber = JSON.parse(maxValue)
            props.setMaxValue(maxValueAsNumber)
        }
    }, [props.maxValue])*/

    const classes = useStyles();

    const style: any = {
        color: 'red',
        textAlign: 'center'
    }


    const onClickHandler = () => {

        if (value !== maxValue) {
            dispatch(incValueAC())
            /*props.setNumber(props.number + 1)*/
        }
    }
    const resetOnClick = () => {
        dispatch(resetValueAC())
        /*props.setNumber(0)*/
    }

    const styleCard = {
        backgroundColor:'#f3f2ef',
        borderRadius:'15px',
    }

    return (
        <Card className={classes.root} elevation={2} style={styleCard}>
            <CardActionArea>
                <CardContent>
                    <Typography variant='h3'>
                        {
                            value >= maxValue ? <h1 style={style}>{value}</h1> :
                                <h1 style={{textAlign: 'center'}}>{value}</h1>
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    style={{borderRadius:'15px'}}
                    onClick={onClickHandler}
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<AddIcon/>}>
                    INC
                </Button>
                <Button
                    style={{borderRadius:'15px'}}
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

