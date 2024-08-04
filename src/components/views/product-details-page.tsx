import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interface/product";
import { fetchCategoryByCategoryID, fetchProductByID } from "../services/api";
import { Categories } from "../interface/categories";
import { format } from "date-fns";
import { Review } from "../interface/review";
import FilledStarIcon from "../svg/filled-star";
import OutlineStarIcon from "../svg/outline-star";
import HeartOutlineIcon from "../svg/outline-heart";

function ProductDetailsPage() {
  let { categoryID, productID } = useParams<{
    categoryID: string;
    productID: string;
  }>();

  const [product, setProduct] = useState<Product>();
  const [category, setCategory] = useState<Categories>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchProduct = await fetchProductByID(
          categoryID ? categoryID : "",
          productID ? productID : ""
        );
        setProduct(fetchProduct);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    const getCateory = async () => {
      try {
        const fetchCategory = await fetchCategoryByCategoryID(
          categoryID ? categoryID : ""
        );
        setCategory(fetchCategory);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
    getCateory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const showProduct = (prod: Product, categ: Categories) => {
    return (
      <div key={prod.id}>
        <img src={prod.image} height={200} width={200} />
        <h1>
          {prod.name} - {categ.name}
        </h1>
        <h3>
          {prod.currency} {prod.price}
        </h3>
        <p>{prod.details}</p>
        <i>
          Created At: {format(new Date(prod.createdAt), "MM:dd:yyyy hh:mm a")}
        </i>
        <h2>Reviews:</h2>
        {prod.reviews.map((review) => showReview(review))}
      </div>
    );
  };

  const getRate = (rate: number): string => {
    return rate > 10000 && rate < 20000
      ? "1"
      : rate > 20000 && rate < 30000
      ? "2"
      : rate > 30000 && rate < 40000
      ? "3"
      : rate > 40000 && rate < 50000
      ? "4"
      : rate > 50000
      ? "5"
      : "0";
  };

  const getStar = (rate: number) => {
    const stars = [];
    for (let i: number = 0; i < rate; i++) {
      stars.push(<FilledStarIcon key={i} />);
    }
    for (let i: number = 5; i > rate; i--) {
      stars.push(<OutlineStarIcon key={i} />);
    }
    return <div>{stars}</div>;
  };

  const showReview = (rev: Review) => {
    const rate = rev.rating;
    return (
      <div>
        <table>
          <tr>
            <td>
              <img src={rev.avatar} height={50} width={50} />
            </td>
            <td>
              <a>
                <b>{rev.name}</b>
                <br />
                {rev.email}
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <a>{getStar(parseInt(getRate(parseInt(rate))))}</a>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <b>{rev.title}</b>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <a>{rev.content}</a>
            </td>
          </tr>
          <tr>
            <td>
              <HeartOutlineIcon />
            </td>
            <td>
              <b>
                <i>{rev.likes}</i>
              </b>
            </td>
          </tr>
        </table>
      </div>
    );
  };

  return (
    <div>
      {product && category
        ? showProduct(product, category)
        : "No product found"}
    </div>
  );
}

export default ProductDetailsPage;
