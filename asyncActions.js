const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware;


// State

const initialState = {
    loading: false,
    data: [],
    error: ''
}

//Actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


// Action Creators

//Fetching data
const fetchUsersRequest = () => {
    return{
        type: FETCH_USERS_REQUEST
    }
}

//Storing data from the api after successfully fetching it
const fetchUsersSuccess = (users) => {
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
        //If the requests is successfull, payload is the array of users
    }
}

const fetchUsersFailure = (error) => {
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
        //If the request fails, payload is the error message sent by the API
    }
}

//Reducer

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS: return{
            ...state,
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE: return{
            ...state,
            loading: false,
            users: [],
            error: action.payload
        }
    }
}

//Async Action Creator
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest())
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            //response.data is the array of users
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(err => {
            //error.message gives the description of error
            dispatch(fetchUsersFailure(err.message))
        } )
    }
}

//Store 
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

//Dispatching the asynchronous action creator
store.dispatch(fetchUsers());