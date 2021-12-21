import axios from "axios";
import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"


//Initial State
const initialState = {
    loggedIn: false,
    currentCust: {}
};

//Reducer Function
const Reducer = (state = initialState, action) => {
    switch (action.type) {
    
        case "TestState":
            console.log(state);
            break;
            
        case "LogIn":
            //console.log(action);

            return {
                ...state,
                loggedIn: true,
                currentCust: action.cust_details
            };
            
        case "LogOut":
            return {
                ...state,
                loggedIn: false,
                currentCust: {}
            }
            
        case "UpdateCustomer":
            console.log("Updating!!!!");
            axios.get(`http://localhost:8001/customers/${state.currentCust.cust_id}`)
                .then(resp => {
                    console.log(resp);
                    return {
                        ...state,
                        currentCust: resp.data
                    }
                })
                .catch(error => console.error(error));
            break;
            
        default:
            break;
    }
    
    return state;
    
};

// - Following a guide here: https://www.cloudsavvyit.com/9778/how-to-persist-your-redux-store/
//https://dev.to/bhatvikrant/redux-persist-v6-in-detail-react-10nh
//Please go over if looking at this code just incase 

const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, Reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

