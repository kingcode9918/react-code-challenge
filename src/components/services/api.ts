import axios, { all } from "axios";

import { Categories } from "../interface/categories";
import { Product } from "../interface/product";

const API = "https://5ffbed0e63ea2f0017bdb67d.mockapi.io";

export const fetchAllProductsSorted = async (): Promise<Product[]> => {
  try {
    const res = await axios.get<Categories[]>(
      `${API}/categories?sortBy=createdAt&order=desc`
    );
    const categories = res.data;
    let allProducts: Product[] = [];
    categories.forEach((category) => {
      const categoryProducts = category.products.map((product) => ({
        ...product,
        categoryName: category.name,
      }));
      allProducts = allProducts.concat(categoryProducts);
    });
    return allProducts;
  } catch (err) {
    console.error("Error fetching: ", err);
    throw err;
  }
};

export const fetchAllCategories = async (): Promise<Categories[]> => {
  try {
    const res = await axios.get<Categories[]>(`${API}/categories`);
    return res.data;
  } catch (err) {
    console.error("Error fetching: ", err);
    throw err;
  }
};

export const fetchProductByCategoryID = async (
  categoryID: string
): Promise<Product[]> => {
  try {
    const res = await axios.get<Categories>(
      `${API}/categories/${categoryID}?sortBy=createdAt&order=desc`
    );
    const categories = res.data;
    let allProducts: Product[] = [];
    const categoryProducts = categories.products.map((product) => ({
      ...product,
      categoryName: categories.name,
    }));
    allProducts = allProducts.concat(categoryProducts);
    return allProducts;
  } catch (err) {
    console.error("Error fetching: ", err);
    throw err;
  }
};

export const searchProductWithFiltered = async (
  categoryID: string,
  searchValue: string
): Promise<Product[]> => {
  try {
    const res = await axios.get<Product[]>(
      `${API}/categories/${categoryID}/products/?search=${searchValue}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
};

export const fetchProductByID = async (
  categoryID: string,
  productID: string
): Promise<Product> => {
  try {
    const res = await axios.get<Product>(
      `${API}/categories/${categoryID}/products/${productID}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching: ", err);
    throw err;
  }
};

export const fetchCategoryByCategoryID = async (
  categoryID: string
): Promise<Categories> => {
  try {
    const res = await axios.get<Categories>(`${API}/categories/${categoryID}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching: ", err);
    throw err;
  }
};
