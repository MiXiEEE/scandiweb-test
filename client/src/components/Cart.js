import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import CartAttribBtnMain from "./CartAttribBtnMain";

export default function Cart() {
  const {
    total,
    products,
    itemCount,
    queryCurrencyIndex,
    updateItemAmount,
    removeFromCart,
    checkOut,
    galleryChange,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleAddItem = (index) => {
    updateItemAmount(index);
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const handleCheckOut = () => {
    alert("Check out completed!");
    checkOut();
    navigate("/");
  };

  const handleGallery = (index, action) => {
    galleryChange(index, action);
  };

  return (
    <div className="main-container">
      <h2>
        <b>CART</b>
      </h2>
      <div className="cart-container">
        {products.length !== 0
          ? products.map((product, index) => {
              return (
                <div key={product.brand + index}>
                  <hr />
                  <div className="cart-product-card-main">
                    <div className="cart-item-info-main">
                      <p style={{ fontWeight: "bold" }}>{product.name}</p>
                      <p>{product.brand}</p>
                      <p>
                        <b>
                          {product.price[queryCurrencyIndex].currency.symbol}
                          {product.price[queryCurrencyIndex].amount}
                        </b>
                      </p>
                      {product.attributes.map((attrib) => {
                        const attrbItemId = attrib.id;

                        return (
                          <div key={attrib.id}>
                            <p className="cart-attrib">{attrib.id}:</p>
                            <CartAttribBtnMain
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
                    <div className="img-container">
                      <img
                        src={product.gallery[product.currentImg]}
                        alt="product-gallery"
                        width="250px"
                        height="288px"
                        style={{
                          minWidth: "250px",
                          minHeight: "288px",
                          maxWidth: "250px",
                          maxHeight: "288px",
                        }}
                      />
                      {product.gallery.length !== 1 ? (
                        <div className="img-control-btn">
                          <button
                            onClick={() => {
                              handleGallery(index, "previous");
                            }}
                          >
                            {"<"}
                          </button>
                          <button
                            onClick={() => {
                              handleGallery(index, "next");
                            }}
                          >
                            {">"}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        <hr />
      </div>
      <div className="cart-total-main">
        {/* should be tax variable*/}
        <p>
          TAX 21%:{" "}
          <span style={{ fontWeight: "bold" }}>
            {parseFloat((21 * total) / 100).toFixed(2)}
          </span>
        </p>
        <p>
          Quantity: <span style={{ fontWeight: "bold" }}>{itemCount}</span>
        </p>
        <p>
          Total{" "}
          <span style={{ fontWeight: "bold" }}>
            {products[0].price[queryCurrencyIndex].currency.symbol}
            {parseFloat(total).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="order-btn">
        <button
          onClick={() => {
            handleCheckOut();
          }}
        >
          ORDER
        </button>
      </div>
    </div>
  );
}
