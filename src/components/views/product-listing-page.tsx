import React, { useEffect, useState } from "react";
import {
  fetchAllCategories,
  fetchAllProductsSorted,
  fetchProductByCategoryID,
  searchProductWithFiltered,
} from "../services/api";
import { Product } from "../interface/product";
import { Categories } from "../interface/categories";
import { useNavigate } from "react-router-dom";

function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    const getAllProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProductsSorted();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
    getAllCategories();
  }, []);

  const getAllProductByCategoryID = async (id: string) => {
    try {
      const fetchedProducts = await fetchProductByCategoryID(id);
      setFilteredProducts(fetchedProducts);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const searchProductFiltered = async (id: string, search: string) => {
    try {
      const fetchedProducts = await searchProductWithFiltered(id, search);
      setSearchProducts(fetchedProducts);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const searchProduct = (searchValue: string) => {
    const searchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchProducts(searchedProducts);
  };

  const showProduct = (prod: Product) => {
    return (
      <table key={prod.id}>
        <tr
          onClick={() => {
            openDetails(prod.categoryId, prod.id);
          }}
        >
          <td>
            <img src={prod.image} height={100} width={100} />
          </td>
          <td>
            {prod.name} - {prod.categoryName}
          </td>
        </tr>
      </table>
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    getSearchProds(filterQuery, event.target.value);
  };

  const getSearchProds = (filter: string, search: string) => {
    filter === ""
      ? searchProduct(search)
      : searchProductFiltered(filter, search);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterQuery(event.target.value);
    getFilterProds(event.target.value);
  };

  const getFilterProds = (filter: string) => {
    filter === "" ? setProducts(products) : getAllProductByCategoryID(filter);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const openDetails = (categoryID: string, productID: string) => {
    navigate(`details/${categoryID}/${productID}`);
  };

  return (
    <div>
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <select value={filterQuery} onChange={handleFilter}>
        <option key="" value="">
          Select a category:
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {filterQuery === "" && searchQuery === ""
        ? products.map((product) => showProduct(product))
        : filteredProducts.length > 0 && searchQuery === ""
        ? filteredProducts.map((product) => showProduct(product))
        : searchProducts.length > 0
        ? searchProducts.map((product) => showProduct(product))
        : null}
    </div>
  );
}

export default ProductListingPage;
