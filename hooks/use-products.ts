import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/store/store';
import { fetchProducts, fetchProductById } from '@/store/slices/products-slice';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading, error, selectedProduct } = useSelector(
    (state: RootState) => state.products
  );

  const loadProducts = () => {
    dispatch(fetchProducts());
  };

  const loadProductById = (id: number) => {
    dispatch(fetchProductById(id));
  };

  return {
    products,
    isLoading,
    error,
    selectedProduct,
    loadProducts,
    loadProductById,
  };
};

export const useProductsWithAutoLoad = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading, error, selectedProduct } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const loadProductById = (id: number) => {
    dispatch(fetchProductById(id));
  };

  return {
    products,
    isLoading,
    error,
    selectedProduct,
    loadProductById,
  };
};
