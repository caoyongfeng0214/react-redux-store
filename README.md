# react-redux-store
dynamic inject and remove reducer(s).

# Required
@reduxjs/toolkit

# Installation
`npm install react-redux-store`

# Usage

### Initialization
```js
import { Provider } from "react-redux";
import store from "react-redux-store";
```
```js
<Provider store={store}>
  // Other codes
</Provider>
```

### Define a reducer
```js
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    // ... ...
  }
});

// ... ...

export default usersSlice;
```

### inject a reducer
```js
import store from "react-redux-store";
import UsersSlice from "../reducers/usersSlice";

store.add(UsersSlice);
```

### remove a reducer
```js
import store from "react-redux-store";

store.remove('users');
```
