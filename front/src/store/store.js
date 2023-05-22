import { createSlice, configureStore, combineReducers  } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key:'root',
    storage,
    version:1
}


const basic = {goods:[]}
const orderSlice = createSlice({
    name:'orderedGoods',
    initialState:basic,
    reducers:{
        addGood(state,action){
            state.goods.push(action.payload)
            
        },
        removeGood(state,action){
            console.log(action.payload)
            const filteredGoods = state.goods.filter(good=>{
                return action.payload._id !== good._id
            })
            state.goods = filteredGoods
            console.log('removed')
        }
    }
})


const compBasic = {items:[]}
const compareSlice = createSlice({
    name:'comparedGoods',
    initialState:compBasic,
    reducers:{
        addToCompare(state,action){
            state.items.push(action.payload)
            console.log(action.payload)
        },
        removeFromCompare(state,action){
            const filteredGoods = state.items.filter(item=>{
                return action.payload._id !== item._id
            })
            console.log(filteredGoods)
            state.items = filteredGoods
        }
    }
})


const likeBasic = {items:[]}
const likeSlice = createSlice({
    name:'likedGoods',
    initialState:likeBasic,
    reducers:{
        addToLiked(state,action){
            state.items.push(action.payload)
            console.log(action.payload)
        },
        removeFromLiked(state,action){
            const filteredGoods = state.items.filter(item=>{
                return action.payload._id !== item._id
            })
            console.log(filteredGoods)
            state.items = filteredGoods
        }
    }
})


const clientBasic = {clientData:null}
const clientSlice = createSlice({
    name:'clientData',
    initialState:clientBasic,
    reducers:{
        loginIn(state,action){
            state.clientData = action.payload
            console.log(action.payload)
        },
        logOut(state){
            state.clientData = null
            console.log('logged out')
            
        }
    }
})


const totalDaysBasic = {
    since:0,
    till:0,
    work:0,
    weekend:0,
    week:0,
    month:0,
    totalPrice:0
}


const totalDaysSlice = createSlice({
    name:'totalPrice',
    initialState:totalDaysBasic,
    reducers:{
        totalDays(state,action){
          console.log(action.payload)
            state.work = action.payload.work
            state.weekend = action.payload.weekend
            state.week = action.payload.week
            state.month = action.payload.month
            
        },
        since(state,action){
            state.since = action.payload
           
        },
        till(state,action){
            state.till = action.payload
        },
        totalPrice(state,action){
            // console.log(action.payload)
            state.totalPrice= action.payload 
        }
        
    }
})



const adminBasic = {adminData:null}
const adminSlice = createSlice({
    name:'adminData',
    initialState:adminBasic,
    reducers:{
        loginAdminIn(state,action){
        
            state.adminData = action.payload
            console.log(action.payload)
        },
        logAdminOut(state){
            state.adminData = null
            console.log('logged out')
            
        }
    }
})




const reducer = combineReducers({
    basketOrders:orderSlice.reducer, 
    comparison:compareSlice.reducer,
    like:likeSlice.reducer,
    client:clientSlice.reducer,
    rentalDays:totalDaysSlice.reducer,
    admin:adminSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig,reducer )

const store = configureStore({
    reducer: persistedReducer
})


export const orderActions = orderSlice.actions;
export const compareActions = compareSlice.actions;
export const likeActions = likeSlice.actions;
export const clientActions = clientSlice.actions;
export const totalDaysActions = totalDaysSlice.actions;
export const adminActions = adminSlice.actions;

export default store;