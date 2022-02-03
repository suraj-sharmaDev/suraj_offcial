export const addOrder = (data) => ({
    type: "ADD_ORDERS",
    payload: data,
  });
  
  export const updateOrder = (data) => ({
    type: "UPDATE_ORDERS",
    payload: data,
  });
  
  export const deleteOrder = (id) => ({
    type: "DELETE_ORDERS",
    payload: id,
  });
  