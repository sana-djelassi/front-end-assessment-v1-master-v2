//import { productApi } from '../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_STORY='DELETE_STORY';
export const CREATE_PRODUCT_SUCCESS='CREATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS='UPDATE_PRODUCT_SUCCESS';


const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});
export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  productId: id,
});

export const updateProduct = (payload) => ({
  type: UPDATE_PRODUCT,
   productId: payload.productId,
   data:payload.data,
  //payload
});

export const updateProductSuccess=(payload)=>({
  type: UPDATE_PRODUCT_SUCCESS,
   productId: payload.id,
   data:payload,
})

export const createProduct = (data) => ({
  type: CREATE_PRODUCT,
  data,
});
export const createProductSuccess=(data)=>({
  type: CREATE_PRODUCT_SUCCESS,
  data,
});
export const receiveProducts = (data) => ({
  
  type: RECEIVE_PRODUCTS,
  products : data.map(product=>product)
});



export const fetchProducts = () => dispatch => {
  dispatch(requestProducts());

};


export const updateProductForm = (payload) => (dispatch, getState, {history}) => {
  dispatch(updateProduct(payload));
  history.push('/');
}

export const createProductForm = (data) => (dispatch, getState,{history}) => {
 dispatch(createProduct(data));

  history.push('/');
}
export const deleteProductForm=(productId)=>(dispatch,getState,{history})=>{
  dispatch(deleteProduct(productId))
}
