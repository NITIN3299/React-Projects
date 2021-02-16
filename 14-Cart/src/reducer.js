import CartItem from "./CartItem"

const reducer = (state,action) =>{

    if(action.type === 'Clear_cart'){
        return {...state,cart:[]}
    }
    if(action.type === 'Remove'){
        const id = action.payload
        return {...state,cart:state.cart.filter((item)=> item.id!==id)}
    }
    if(action.type === 'Increase'){
        let tempCart = state.cart.map((item)=>{
            if(item.id===action.payload){
                return {...item,amount:item.amount+1}
            }
            return item
        })
        return {...state,cart:tempCart}
    }
    if(action.type === 'Decrease'){
        let tempCart = state.cart.map((item)=>{
            if(item.id===action.payload){
                    return {...item,amount:item.amount-1}
            }
            return item
        }).filter((item)=>item.amount!==0)
        return {...state,cart:tempCart}
    }
    if(action.type === 'Get_totals'){
        let {total,amount} = state.cart.reduce(
            (cartTotal,CartItem)=>{
            const {price,amount} = CartItem;
            const itemtotal= price*amount;

            cartTotal.total+=itemtotal;
            cartTotal.amount+=amount;
            return cartTotal
        },
        {
            total:0,
            amount:0
        })
        total = parseFloat(total.toFixed(2))
        return {...state,total,amount}
    }
    if(action.type==='Loading'){
        return {...state,loading:true}
    }
    if(action.type==='Display'){
        return {...state,cart:action.payload,loading:false}
    }
    if(action.type==='Toggle'){
        let tempcart = state.cart.map((item)=>{
             if(item.id===action.payload.id){
                 if(action.payload.type==='inc'){
                     return {...item,amount:item.amount+1}
                 }
                 if(action.payload.type==='dec'){
                     return {...item,amount:item.amount-1}
                 }
                 return item
             }
             return item
        }).filter((item)=>item.amount!==0)
        return {...state,cart:tempcart}
    }
    return state
}


export default reducer;