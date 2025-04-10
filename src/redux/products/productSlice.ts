import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByFilters,
  fetchProductsDetails,
  fetchSimilarProducts,
  updateProduct,
} from "./productThunks";
import { ProductsState } from "./productTypes";

const initialState: ProductsState = {
  products: [],
  selectedProduct: null, // Store the details of the single Product
  similarProducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    size: "",
    color: "",
    gender: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    material: "",
    brand: "",
    collection: "",
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        brand: "",
        collection: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // handle fetching products with filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      // handle fetching single product
      .addCase(fetchProductsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      // handle updating a product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const {id, productData} = action.payload;
        const index = state.products.findIndex(
          (product) => product.id === id
        );
        if (index !== -1) {
          state.products[index] = productData;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      // fetch similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export const productsSliceReducer = productSlice.reducer;
