const initialState = [];

const ProductReducer = (state = initialState, action)=>{

  const addProductHandler = (state, data) => {
    const newState = [...state];
    newState.push(...data);
    return [...new Set(newState)];
  }

  const updateProductHandler = (state, data) => {
    console.log(data);
    return state;
  }

  const deleteProductHandler = (state, data) => {
    console.log(data);
    return state;
  }

  switch(action.type){
      case 'ADD_PRODUCTS':{
          return addProductHandler(state, action.payload);
      }
     
      case 'UPDATE_PRODUCTS': {
          return updateProductHandler(state, action.payload);
      }

      case 'DELETE_PRODUCTS': {
        return deleteProductHandler(state, action.payload);
      }

      default: {
          return state
      }
  }
}
export default ProductReducer;