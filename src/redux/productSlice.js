
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import prodctJson from '../product.json'

export const fetchLocalProductData = createAsyncThunk('data/fetchLocalProductData', async () => {
    return prodctJson;
  });

const initialState = {
  productData: prodctJson
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { openModal, closeModal } = productSlice.actions;
export default productSlice.reducer;
