const redux = require('redux');
const createStore = redux.createStore


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

//Store 
const store = createStore(reducer);