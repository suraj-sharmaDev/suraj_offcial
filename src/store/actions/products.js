export const addProduct = (data) => ({
  type: "ADD_PRODUCTS",
  payload: data,
});

export const updateProduct = (data) => ({
  type: "UPDATE_PRODUCTS",
  payload: data,
});

export const deleteProduct = (id) => ({
  type: "DELETE_PRODUCTS",
  payload: id,
});
