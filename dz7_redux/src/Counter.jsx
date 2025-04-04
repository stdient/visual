import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrement, incrementAsync, selectCount} from "./counterSlice";

const Counter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(incrementAsync())}>asyncIncrement</button>
        </div>
    )
}