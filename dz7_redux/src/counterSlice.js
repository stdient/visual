import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const incrementAsync = createAsyncThunk(
    'counter/increment',
    async_amount => {
        const response = await fetchCount(amount);
        return response.data;
    }
)

export const counterSlice = createSlice({
    name: 'counter',
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        }
    }

    extraReducers: builder => {
        builder.addCase(incrementAsync.pending, state => {
            state.status = 'loading';
        })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            })
    }
})

export const {increment, decrement} = counterSlice.actions;
export const selectCount = state => state.counter.value;