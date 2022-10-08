import { useDispatch } from "react-redux";
import { configureStore, combineReducers, createSlice as Slice } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: () => {}
});

store.asyncReducers = {};

store.add = (...slices) => {
    slices.forEach(slice => {
        let name = slice.name;
        if(name && !store.asyncReducers[name]) {
            let reducer = slice.reducer;
            if(reducer) {
                store.asyncReducers[name] = reducer;
                store.replaceReducer(combineReducers(store.asyncReducers));
            }
        }
    });
};

store.remove = (...nameOrSlices) => {
    nameOrSlices.forEach(T => {
        let name = typeof(T) === 'string' ? T : T.name;
        if(name) {
            delete store.asyncReducers[name];
        }
    });
    store.replaceReducer(combineReducers(store.asyncReducers));
};


const createSlice = ({ name, initialState, reducers, methods }) => {
    const slice = Slice({
        name,
        initialState,
        reducers
    });

    const useMethods = () => {
        const dispatch = useDispatch();

        return methods(dispatch, slice.actions);
    };

    slice.use = useMethods;

    return slice;
};


store.createSlice = createSlice;


export default store;