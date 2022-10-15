# react-redux-store
dynamic inject and remove reducer(s).

# Required
react-redux

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
  {/* ... ... */}
</Provider>
```

### Define a slice
```js
import store from "react-redux-store";

// Automatically added to Store
const usersSlice = store.createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setValues(state, action) {
      return action.payload;
    },
    // ... ...
  },
  methods: ({ setValues }) => ({
    async init() {
      const list = await UsersService.getAll();
      setValues(list);
    },
    // ... ...
  })
});

export default usersSlice;
```


### manually add a slice
```js
import store from "react-redux-store";
import UsersSlice from "../reducers/usersSlice";

store.add(UsersSlice);
```

### remove a slice
```js
import store from "react-redux-store";

store.remove('users');
```


# Example

`/src/index.js`
```js
import { Provider } from 'react-redux';
import store from 'react-redux-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* ... ... */}
  </Provider>
);
```

`/src/slices/users.js`
```js
import store from "react-redux-store";

const UsersSlice = store.createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setValues(state, action) {
            return action.payload;
        }
    },
    methods: ({ setValues }) => ({
        async init() {
            let users = await UsersService.getAll(); // get all users from server
            setValues(users);
        }
    })
});

export default UsersSlice;
```

`/src/pages/Page1.js`
```js
import store from "react-redux-store";
import UsersSlice from "../slices/users";

const Page1 = () => {
    const Users = UsersSlice.use();
    
    const users = useSelector(({ users }) => {
        return users;
    });

    useEffect(() => {
        Users.init();
    }, []);
};

export default Page1;
```
