import { configureStore, combineReducers } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: () => {}
});

store.asyncReducers = {};

store.add = (...slices) => {
    slices.forEach(slice => {
        let name = slice.name;
        if(name && !store.asyncReducers[name]) {
            let reducer = slice.reducer;
            store.asyncReducers[name] = reducer;
            store.replaceReducer(combineReducers(store.asyncReducers));
        }
    });
};

store.remove = (...nameOrSlices) => {
    nameOrSlices.forEach(T => {
        let name = typeof(nameOrSlices) === 'string' ? nameOrSlices : nameOrSlices.name;
        if(name) {
            delete store.asyncReducers[name];
        }
    });
    store.replaceReducer(combineReducers(store.asyncReducers));
};


export default store;