import * as productsActions from '../actions/products';
import { all, call, fork,  takeEvery,put } from "redux-saga/effects";
import {generateId} from '../utils';
import StoryblokClient from 'storyblok-js-client/dist/es5/index.es'
import {receiveProducts,createProductSuccess,updateProductSuccess} from '../actions/products'
import axios from "axios";


let storyblokContentDelivery = new StoryblokClient({
  accessToken:'4DinmpBz3Yr4A4XmkqIT6Att',
  cache: {
    clear: "auto",
    type: "memory",
  },
 
})
const API_URL= "https://mapi.storyblok.com/v1/"
let Storyblok = axios.create({
  baseURL:API_URL,
  headers: {
    Authorization:'nGd9zg4yhBks3IgpHoYDhwtt-133724-cWUJAnK6yR5MFAu2fwXj',
    accessToken:'4DinmpBz3Yr4A4XmkqIT6Att',
  },
});
//////my space///////
const mySpace=180544

///////////header/////////
const header = new Headers(
{ "Access-Control-Allow-Origin": "*"},
{"Content-Type": "application/json"},
{"Accept": "application/json"}

);

////////// add product//////////////
const addProductRequest= async(data)=> {

   return await Storyblok.post(`spaces/${mySpace}/stories`,{
    "story":{
     "name": data.storyName,
     "slug": data.storySlug,
    
    "content":{
       "component":"product",
     
        
            "name":data.name,
            "brand":data.brand,
            "rating":data.rating,
            "categories":data.categories,
            "itemsInStock":data.itemsInStock,
            "receiptDate":data.receiptDate,
            "expirationDate":data.expirationDate,
            "featured":data.featured,
            "id": generateId(),
            "createdAt":data.createdAt
      
    }
   }
    ,
   "publish":1
  
 }

, {headers:header}
  )
  .then(response => response
 
).catch(error => { 
   
  })
}

function* addProduct({data}){
    try{
        const ret = yield call(addProductRequest, data);
           
        yield put(createProductSuccess(ret.data.story))
    }
    catch (error) {
        console.log('saga err', error);
      }
}



//////////get all products///////////

const getAllProductRequest=async()=>{
  return await storyblokContentDelivery.getAll(`cdn/stories`,
  )
  .then(response => response
  
  ).catch(error => { 
 
  })
}
function* getProducts(){
  try{
     const ret = yield call(getAllProductRequest);

     let products=[]

     products=ret
    

    yield put(receiveProducts(products))

  }
    
  
catch (error) {
    //console.log('saga err', error);
  }
}
/////////update products///////////
const updateProductRequest = async(payload)=>{
 

  let productId=payload.productId
  
  return await Storyblok.put(`spaces/${mySpace}/stories/${productId}`, {
    "story": {
      "name": payload.data.storyName,
      "slug": payload.data.storySlug,
      "id": payload.productId,
      "content": {
             "component": "product",
              "name":payload.data.name,
              "brand":payload.data.brand,
              "rating":payload.data.rating,
              "categories":payload.data.categories,
              "itemsInStock":payload.data.itemsInStock,
              "receiptDate":payload.data.receiptDate,
              "expirationDate":payload.data.expirationDate,
              "featured":payload.data.featured,
              "createdAt":payload.data.createdAt
        
      }
    },
    "force_update": 1,
    "publish":1
  
  },{headers:header}
  ).then(response => 
   response
  ).catch(error => { 

  })
  }
function* updateProduct(payload){
  try{
   
    const ret=yield call(updateProductRequest,payload)
   
    yield put(updateProductSuccess(ret.data.story))
  }
  catch(error){

  }

 }

///////////*******DELETE PRODUCT ***********///////
// const deleteProductRequest=async(productId)=>{
//   return await Storyblok.delete(`cdn/spaces/${mySpace}/stories/${productId}`
//   ).then(response => response
  
//   ).catch(error => { 
    
//   })
// }
// function* deleteProduct(productId){
// try{
// const ret=yield call(deleteProductRequest,productId)
// }
// catch(error){
// console.log("====>error",error)
// }
// }
//////// WATCHERS
export function* watchAddOne() {
    yield takeEvery(productsActions.CREATE_PRODUCT, addProduct);
    
  }
export function* watchGetAll(){
  yield takeEvery(productsActions.REQUEST_PRODUCTS, getProducts);
}
export function* watchUpdate(){
  yield takeEvery(productsActions.UPDATE_PRODUCT, updateProduct);
}
// export function* watchDelete(){
//   yield takeEvery(productsActions.DELETE_PRODUCT, deleteProduct);

// }
export default function* rootSaga() {
    yield all([
    
      fork(watchAddOne),
      fork(watchGetAll),
      fork(watchUpdate),
     //fork(watchDelete)
      
  
    ]);
  }