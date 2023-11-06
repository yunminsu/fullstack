import { createSlice } from "@reduxjs/toolkit";

const product = {
  productList: []
};

export const productSlice = createSlice({
  name: 'product',
  initialState: product,
  reducers: {
    addToProductList: (state, action) => {
    // addToProductList: (state, { payload: productName }) => // { action: {payload}를 구조 분해 할당 후 별칭 지정 }
      state.productList = state.productList.concat(action.payload);
    },
  }
});

export const { addToProductList } = productSlice.actions;

// 함수 
export const selectProductList = state => state.product.productList;

export default productSlice.reducer;

