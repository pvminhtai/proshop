import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from '../constants';

export const getProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (payload) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload
});

export const getProductsFailure = (payload) => ({
  type: GET_PRODUCTS_FAILURE,
  payload
});