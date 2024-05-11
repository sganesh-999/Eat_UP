import { createSlice, current } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        items_id:[],
        items_id_count:{},
        total:0,
        restId:"",
        restName:"",
        resInfo:"",
        
        
    },
    reducers:{
        
        updateTotal:(state)=>{
            state.total=0
            
            for (let [key, value] of Object.entries(state.items_id_count)) {
                state.total=state.total+
                
                ((state.items.find(item => item.card.info.id===key))?.card?.info?.price/100  || (state.items.find(item => item.card.info.id===key))?.card?.info.defaultPrice/100 ) *value
                //console.log('this-',current(state.items.find(item => item.card.info.id===key)))
               //console.log(current(state.items.filter(item => item.card.info.id===key)))
                }
                console.log('cart items',current(state.items))
        },
        addItem : (state,action)=>{
                    
                    
                    if(!state.items_id.includes(action.payload.card.info.id)){
                        state.items.push(action.payload)
                        state.items_id.push(action.payload.card.info.id)
                        state.items_id_count[action.payload.card.info.id]=1
                        //console.log(state.items_id.includes(action.payload.card.info.id))
                    }
                    else{
                        state.items_id_count[action.payload.card.info.id]=state.items_id_count[action.payload.card.info.id]+1
                    }
                //console.log(current(state.items_id_count))
                
                
                
                
            
        },
        removeItem:(state,action)=>{
            //state.items= state.items.filter(item => item.card.info.id!==action.payload.card.info.id);
            //state.items_id=state
            
            
            if(state.items_id_count[action.payload.card.info.id]>1){
                state.items_id_count[action.payload.card.info.id]=state.items_id_count[action.payload.card.info.id]-1
            }else{
                state.items= state.items.filter(item => item.card.info.id!==action.payload.card.info.id);
                delete state.items_id_count[action.payload.card.info.id]
                state.items_id = state.items_id.filter(item => item!==action.payload.card.info.id);
            }
            
            
        },
        clearCart:(state)=>{
            state.items.length=0
            state.total=0
            state.restId=""
            state.items_id.length=0
            state.items_id_count={}
        },

        updateRestaurantId:(state,action)=>{
            
            if(state.restId!==action.payload){
                state.restId=action.payload
                state.updatedResId=true
            }
            //console.log('cuurent resid',state.restId)
        },
        updateRestaurantName:(state,action)=>{
            if(state.restName!==action.payload){
                state.restName=action.payload
                
            }
        },
        updateRestaurantInfo:(state,action)=>{
            if(state.resInfo.id!==action.payload.id){
                state.resInfo=action.payload
                
            }
        }
    }
})

export const {addItem,removeItem,clearCart,updateTotal,updateRestaurantId,updateRestaurantName,updateRestaurantInfo} = CartSlice.actions

export default CartSlice.reducer;