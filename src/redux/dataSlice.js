// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jsonData from '../orders.json';

// Async thunk to fetch data from the JSON file
export const fetchLocalData = createAsyncThunk('data/fetchLocalData', async () => {
  return jsonData;
});
const initialState = {
  orders: jsonData.orders,
};


const dataSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateQuantityAndPriceWithReason: (state, action) => {
      const { orderId, productId, quantity, price, status } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        const product = order.product.find((p) => p.productId === productId);
        if (product) {
          product.quantity = quantity;
          product.price = price;
          product.status= status;
        }
      }
    },
    updateProductStatus: (state, action) => {
      const { orderId, productId, status } = action.payload;
      const orderIndex = state.orders.findIndex((order) => order.orderId === orderId);
      if (orderIndex !== -1) {
        const productIndex = state.orders[orderIndex].product.findIndex(
          (product) => product.productId === productId
        );
        if (productIndex !== -1) {
          state.orders[orderIndex].product[productIndex].status = status;
        }
      }
    },

    addProduct(state, action) {
      
      const { orderId, newProduct } = action.payload;
      state.orders = state.orders.map((order) => {
        if (order.orderId === orderId) {
          newProduct.map((prod) => order.product.push(prod));
        }
        return order;
      });
    },
    updateOrderStatus(state, action){
      const { orderId, order_status } = action.payload;
      console.log(orderId, status, "from reducer");
      state.orders = state.orders.map((order) => {
        if (order.orderId === orderId) {
          order.order_status = order_status
        }
        return order;
      })
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocalData.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchLocalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
}
});

export const { updateQuantityAndPriceWithReason, addProduct, updateProductStatus, updateOrderStatus} = dataSlice.actions;
export default dataSlice.reducer;
