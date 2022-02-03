const initialState = [];

const OrderReducer = (state = initialState, action)=>{
  
  const addOrderHandler = (state, data) => {
    const newState = [...state];
    newState.push(...data);
    return [...new Set(newState)];
  }

  const updateOrderHandler = (state, data) => {
    console.log(data);
    return state;
  }

  const deleteOrderHandler = (state, data) => {
    console.log(data);
    return state;
  }

  switch(action.type){
      case 'ADD_ORDERS':{
          return addOrderHandler(state, action.payload);
      }
     
      case 'UPDATE_ORDERS': {
          return updateOrderHandler(state, action.payload);
      }

      case 'DELETE_ORDERS': {
        return deleteOrderHandler(state, action.payload);
      }

      default: {
          return state
      }
  }
}
export default OrderReducer;