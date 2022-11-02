import StoryblokClient from 'storyblok-js-client'
import moment from 'moment';
import * as categoriesActions from '../actions/categories';


let Storyblok = new StoryblokClient({
  oauthToken: 'nGd9zg4yhBks3IgpHoYDhwtt-133724-cWUJAnK6yR5MFAu2fwXj',
  accessToken:'4DinmpBz3Yr4A4XmkqIT6Att',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})

const header = new Headers(
{ "Access-Control-Allow-Origin": "*"},
{"Content-Type": "application/json"},
{"Accept": "application/json"}

);


const getAllCategoriesRequest=async()=>{
    return await Storyblok.get("cdn/stories",
    // {
    //   "starts_with": "categories/",
    // }
    )
    .then(response =>
     console.log("=====>reponse",response)
    ).catch(error => { 
      
    })
  }
  function* getCategories(){
    try{
      const ret = yield call(getAllCategoriesRequest);
     
     
     console.log("====>ret",ret)
    //     let categories=[]
    //     const stories=ret
    //    for(let i=0;i<stories.length;i++){
    //     categories.push(stories[i].categories)
    //    }
     
        //yield put(productsActions.receiveCategoriesSucess(products))
      
    }
  catch (error) {
      console.log('saga err', error);
    }
  }

  //////// WATCHERS

export function* watchGetAll(){
  yield takeEvery(categoriesActions.RECEIVE_CATEGORIES, getCategories);
}

export default function* rootSaga() {
    yield all([
    
      fork(watchGetAll),
      
  
    ]);
  }