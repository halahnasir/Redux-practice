const redux = require('redux');
// const createstore = redux.createStore();

console.log('Hello from index.js');

// Declare Action
const BUY_CAKE = 'BUY_CAKE'; 

// Define Action
// {
//     type: BUY_CAKE,
//     info: 'My first redux action'
// }

// Action Creator 
const buyCake = () => {
    return{
        type: BUY_CAKE,
        info: 'My first redux function'
    }
}

//Reducer 
//(previousState, action) => newState

//A state is a single object
const initialState = {
    numOfCakes: 10
}

//Defining a reducer function
const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
                ...state,
                numOfCakes: state.numOfCakes - 1 
            }
        default: return state
    }
}


//Store
// --> Responsibilities of a store:
// 1. Holds the state of the application --> createStore takes in a parameter -- which is a reducer function---- It is required to carry out any state transitions based on the actions received
const store = redux.createStore(reducer)

// 2. Allows access to aplication state via getState() method
console.log('Initial state: ', store.getState());

// 4. 
const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe();

