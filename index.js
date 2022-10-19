import { useDispatch } from "react-redux";
import { configureStore, combineReducers, createSlice as Slice } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: () => {}
});

store.asyncReducers = {};

store.add = (...slices) => {
    let bl = false;
    slices.forEach(slice => {
        let name = slice.name;
        if(name && !store.asyncReducers[name]) {
            let reducer = slice.reducer;
            if(reducer) {
                bl = true;
                store.asyncReducers[name] = reducer;
            }
        }
    });
    if(bl) {
        store.replaceReducer(combineReducers(store.asyncReducers));
    }
};

store.remove = (...nameOrSlices) => {
    let bl = false;
    nameOrSlices.forEach(T => {
        let name = typeof(T) === 'string' ? T : T.name;
        if(name && store.asyncReducers[name]) {
            bl = true;
            delete store.asyncReducers[name];
        }
    });
    if(bl) {
        store.replaceReducer(combineReducers(store.asyncReducers));
    }
};



const _initAction = (dispatch, action) => {
    return (...ps) => {
        dispatch(action(...ps));
    };
};


const createSlice = ({ name, initialState, reducers, methods }) => {
    const slice = Slice({
        name,
        initialState,
        reducers
    });

    const useMethods = () => {
        const dispatch = useDispatch();

        let actions = {};
        if(slice.actions) {
            for(let k in slice.actions) {
                actions[k] = _initAction(dispatch, slice.actions[k]);
            }
        }

        return methods(actions);
    };

    slice.use = useMethods;

    store.add(slice);

    return slice;
};


store.createSlice = createSlice;


export default store;