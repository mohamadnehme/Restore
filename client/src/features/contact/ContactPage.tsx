import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrementCounter, incrementCounter } from "./counterSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter);
    return (
        <>
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="h5">
                the data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrementCounter(1))} variant="contained" color="error">Decrement</Button>
                <Button onClick={() => dispatch(incrementCounter(1))} variant="contained" color="success">Increment</Button>
            </ButtonGroup>
        </>
    )
}