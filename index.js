const redux = require('redux');
// const createStore = redux.createStore();
const combineReducers = redux.combineReducers

console.log('Hello from index.js');

// Declare Action
const BUY_CAKE = 'BUY_CAKE'; 
const BUY_ICECREAM = 'BUY_ICECREAM';

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

const buyIceCream = () => {
    return {
        type: BUY_ICECREAM
    }
}

//Reducer 
//(previousState, action) => newState

//A state is a single object
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

// Separation of concerns --> For scalability purposes
const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

//Defining a reducer function
// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case BUY_CAKE: return{
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1 
//             }
//         case BUY_ICECREAM: return{
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         }
//         default: return state
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}

//Combining Multiple Reducers 
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
  })

//Store
// --> Responsibilities of a store:
// 1. Holds the state of the application --> createStore takes in a parameter -- which is a reducer function---- It is required to carry out any state transitions based on the actions received
const store = redux.createStore(rootReducer)

// 2. Allows access to aplication state via getState() method
console.log('Initial state: ', store.getState());

// 4. 
const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();

