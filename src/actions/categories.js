export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORIES_SUCCES='RECEIVE_CATEGORIES_SUCCES';

const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

const receiveCategories = (json) => ({
  type: RECEIVE_CATEGORIES,
  categories: json.map(category => category),
});
// export const receiveCategoriesSucess=(categories)=>({
//   type:RECEIVE_CATEGORIES_SUCCES,
  
//   categories
// });
export const fetchCategories = () => (dispatch, getState, {categoryApi}) => {
  dispatch(requestCategories());
  const json = categoryApi.getCategories();
  dispatch(receiveCategories(json));
};
