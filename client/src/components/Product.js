import { gql, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Interweave } from "interweave";
import { CartContext } from "../context/cartContext";
import ProductAttrib from "./ProductAttrib";

const GET_PRODUCT = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export default function Product() {
  const [image, setImage] = useState([0]);

  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();

  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productId,
    },
    fetchPolicy: "no-cache",
  });

  const handleImageClick = (index) => {
    setImage(index);
  };

  const handleAddToCart = () => {
    const product = {
      name: data.product.name,
      brand: data.product.brand,
      price: data.product.prices,
      attributes: data.product.attributes,
      gallery: data.product.gallery,
      itemCount: 1,
      currentImg: 0,
    };
    addToCart(product);
  };

  if (loading) return <div>loading...</div>;
  return (
    <div className="product-display">
      {/*Product Left side panel smaller images*/}
      <div className="product-side-panel">
        {data?.product.gallery.map((productImg, index) => {
          if (index !== 0) {
            return (
              <button
                onClick={() => {
                  handleImageClick(index);
                }}
                className="product-side-button"
                key={index}
              >
                <img
                  src={productImg}
                  width="80px"
                  height="80px"
                  alt="product"
                />
              </button>
            );
          }
          return null;
        })}
      </div>
      {/*Product main image on load gallery[0]*/}
      <div className="main-img">
        <img
          src={data.product.gallery[image]}
          width="611px"
          height="511px"
          alt="main-img"
        />
        {!data?.product.inStock ? (
          <h3 className="out-of-stock-product">OUT OF STOCK</h3>
        ) : null}
      </div>
      {/*Product right panel with details*/}

      <div className="product-details">
        <h1>{data.product.brand}</h1>
        <p>{data.product.name}</p>

        {/* Product attribute boxes, different sizes or diff colors*/}
        <ProductAttrib data={data.product.attributes} />
        <h3>PRICES:</h3>
        <p>
          <b>{`${data.product.prices[0].currency.symbol} ${data.product.prices[0].amount}`}</b>
        </p>
        <button
          disabled={!data?.product.inStock}
          onClick={() => handleAddToCart()}
          className="cart-button"
        >
          ADD TO CART
        </button>

        {/* transforms graphql json html tags into real tags */}
        <Interweave content={data.product.description} />
      </div>
    </div>
  );
}
