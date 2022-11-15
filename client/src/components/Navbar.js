import React, { useContext, useState } from "react";
import Logo from "../svg/Brand_icon.svg";
import Money from "../svg/Money_icon.svg";
import Cart from "../svg/Empty_cart.svg";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { CartContext } from "../context/cartContext";
import CartAttribBtn from "./CartAttribBtn";

const GET_CURRENCY = gql`
  query Currencies {
    currencies {
      label
      symbol
    }
  }
`;

const GET_CATEGORIES = gql`
  query Category {
    categories {
      name
    }
  }
`;

export default function Navbar() {
  const res1 = useQuery(GET_CURRENCY);
  const res2 = useQuery(GET_CATEGORIES);
  const [isOpen, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const {
    total,
    products,
    itemCount,
    updateCurrencyType,
    queryCurrencyIndex,
    updateItemAmount,
    removeFromCart,
    checkOut,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const navbarCloseModal = () => {
    setCartOpen(false);
    setOpen(false);
  };

  const handleAddItem = (index) => {
    updateItemAmount(index);
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const handleCurrencyClick = (index) => {
    updateCurrencyType(index);
  };

  const handleCheckOut = () => {
    alert("Check out completed!");
    checkOut();
    navbarCloseModal();
    navigate("/");
  };

  return (
    <>
      <div
        className="navbar"
        onClick={
          cartOpen || isOpen
            ? () => {
                navbarCloseModal();
              }
            : null
        }
      >
        <span className="nav-items-left">
          {res2.data?.categories.map((category) => {
            return (
              <Link
                to={category.name === "all" ? "/" : `/${category.name}`}
                className="nav-item-left"
                key={category.name}
              >
                {category.name.toUpperCase()}
              </Link>
            );
          })}
        </span>
        <span>
          <img src={Logo} alt="Logo" />
        </span>
        <span className="nav-actions-right">
          <div className="dropdown">
            <button onClick={() => toggleDropdown()}>
              <img src={Money} alt="$" />
            </button>
            <div className={"dropdown-items" + (isOpen ? "" : "-close")}>
              {res1.data?.currencies.map((currency, index) => {
                return (
                  <button
                    className="currencybtn"
                    key={currency.label}
                    onClick={() => {
                      handleCurrencyClick(index);
                    }}
                  >{`${currency.symbol} ${currency.label}`}</button>
                );
              })}
            </div>
          </div>

          {/* was button instead of link (not alligned proprly ) test*/}
          <div className="dropdown">
            <button onClick={() => toggleCart()}>
              <img src={Cart} alt="Cart" />
              {itemCount !== 0 ? (
                <div className="itemCount">{itemCount}</div>
              ) : null}
            </button>
            <div
              className={"cart-modal" + (cartOpen ? "" : "-close")}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <p style={{ fontStyle: "normal", fontWeight: "700" }}>
                <b>My Bag,</b> {itemCount} items
              </p>
              <div className="containcart-items">
                {/* PRODUCTS IN BAG */}
                {products.length !== 0
                  ? products.map((product, index) => {
                      return (
                        <div key={+index}>
                          <div className="cart-product-card">
                            <div className="cart-item-info">
                              <p>{product.name}</p>
                              <p>
                                <b>
                                  {
                                    product.price[queryCurrencyIndex].currency
                                      .symbol
                                  }
                                  {product.price[queryCurrencyIndex].amount}
                                </b>
                              </p>
                              {product.attributes.map((attrib) => {
                                const attrbItemId = attrib.id;

                                return (
                                  <div key={attrib.id}>
                                    <p className="cart-attrib">{attrib.id}:</p>
                                    <CartAttribBtn
                                      attrbItemId={attrbItemId}
                                      items={attrib.items}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div className="add-remove-btn">
                              <button
                                onClick={() => {
                                  handleAddItem(index);
                                }}
                              >
                                +
                              </button>
                              <span>{product.itemCount}</span>
                              <button
                                onClick={() => {
                                  handleRemoveItem(index);
                                }}
                              >
                                -
                              </button>
                            </div>
                            <img
                              src={product.gallery[0]}
                              alt="product-gallery"
                              width="121"
                              height="190"
                            />
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              {/* CART TOTAL */}
              {products.length !== 0 ? (
                <>
                  <div className="cart-total">
                    <span>Total</span>
                    <span>
                      {products[0].price[queryCurrencyIndex].currency.symbol}
                      {parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-modal-buttons">
                    <Link to="/cart" className="modal-btn">
                      VIEW BAG
                    </Link>
                    <button
                      onClick={() => {
                        handleCheckOut();
                      }}
                    >
                      CHECK OUT
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </span>
      </div>
      {cartOpen ? (
        <div
          className="modal-graybg"
          onClick={() => {
            toggleCart();
          }}
        >
          {/* empty div for gray background*/}
        </div>
      ) : null}
      {isOpen ? (
        <div
          className="modal-currencybg"
          onClick={() => {
            toggleDropdown();
          }}
        ></div>
      ) : null}
    </>
  );
}
