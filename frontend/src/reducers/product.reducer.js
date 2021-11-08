import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from '../constants';

const initialState = {
  products: []
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        ...state
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        ...state
      }
    case GET_PRODUCTS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state
      }
    default:
      return state;
  }
}

export default productReducer;