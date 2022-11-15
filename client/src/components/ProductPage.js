import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import Cart from "../svg/Empty_cart.svg";

const GET_PRODUCTS = gql`
  query Category($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        brand
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
      }
    }
  }
`;

export default function ProductPage() {
  const { id } = useParams();

  const { addToCart, queryCurrencyIndex } = useContext(CartContext);
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        title: id === undefined ? "all" : id,
      },
    },
  });

  const handleAddToCart = (name, brand, price, attributes, gallery) => {
    const product = {
      name,
      brand,
      price,
      attributes,
      gallery,
      itemCount: 1,
      currentImg: 0,
    };
    addToCart(product);
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className="main-container">
      <h2>{data?.category.name.toUpperCase()}</h2>
      <div className="product-container">
        {data?.category.products.map((product) => {
          return (
            <div className="card-container" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-card">
                <img
                  src={product.gallery[0]}
                  width="356"
                  height="338"
                  alt="product img"
                />
                <p className="product-name">{product.name}</p>
                <p className="product-price">{`${product.prices[queryCurrencyIndex].currency.symbol} ${product.prices[queryCurrencyIndex].amount}`}</p>
              </Link>
              {product.inStock ? (
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.name,
                      product.brand,
                      product.prices,
                      product.attributes,
                      product.gallery
                    )
                  }
                  className="hover-cart"
                >
                  <img src={Cart} alt="Cart" style={{ fill: "#fff" }} />
                </button>
              ) : (
                <h3 className="out-of-stock">OUT OF STOCK</h3>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
