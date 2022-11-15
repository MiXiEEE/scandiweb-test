import { createContext, useReducer } from "react";

const initialState = {
  total: 0,
  itemCount: 0,
  products: [],
  queryCurrencyIndex: 0,
};

const shopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      console.log("ADD_TO_CART", payload);
      return {
        ...state,
        products: payload.products,
        itemCount: payload.itemCount,
      };

    case "UPDATE_ITEM_AMOUNT":
      console.log("UPDATE_ITEM_AMOUNT", payload);
      return {
        ...state,
        products: payload.products,
        itemCount: payload.itemCount,
      };

    case "REMOVE_FROM_CART":
      console.log("REMOVE_FROM_CART", payload);
      return {
        ...state,
        products: payload.products,
        itemCount: payload.itemCount,
      };

    case "UPDATE_PRICE":
      console.log("UPDATE_PRICE", payload);
      return {
        ...state,
        total: payload.total,
      };

    case "UPDATE_CURRENCY":
      console.log("UPDATE_CURRENCY", payload);
      return {
        ...state,
        queryCurrencyIndex: payload.queryCurrencyIndex,
      };

    case "CHECK_OUT":
      console.log("CHECK_OUT", payload);
      return {
        ...state,
        products: payload.products,
        itemCount: payload.itemCount,
      };

    case "GALLERY_CHANGE":
      console.log("GALLERY_CHANGE", payload);
      return {
        ...state,
        products: payload.products,
      };

    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};

const CartContext = createContext(initialState);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (product) => {
    const updatedCart = state.products.concat(product);
    updatePrice(updatedCart);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCart,
        itemCount: state.itemCount + 1,
      },
    });
  };

  const updateItemAmount = (itemIndex) => {
    const item = state.products;
    item[itemIndex].itemCount += 1;
    updatePrice(item);
    dispatch({
      type: "UPDATE_ITEM_AMOUNT",
      payload: {
        products: item,
        itemCount: state.itemCount + 1,
      },
    });
  };

  const removeFromCart = (itemIndex) => {
    const updatedCart = state.products;
    if (updatedCart[itemIndex].itemCount !== 1) {
      updatedCart[itemIndex].itemCount -= 1;
    } else {
      state.products.splice(itemIndex, 1);
    }
    updatePrice(updatedCart);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart,
        itemCount: state.itemCount - 1,
      },
    });
  };

  const updatePrice = (products, indx) => {
    let total = 0;

    products.forEach(
      (product) =>
        (total +=
          product.price[indx || indx === 0 ? indx : state.queryCurrencyIndex]
            .amount * product.itemCount)
    );

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        total,
      },
    });
  };

  const updateCurrencyType = (currencyIndex) => {
    const stateProducts = state.products;
    const updatedCurrency = currencyIndex;
    updatePrice(stateProducts, updatedCurrency);
    dispatch({
      type: "UPDATE_CURRENCY",
      payload: {
        queryCurrencyIndex: updatedCurrency,
      },
    });
  };

  const checkOut = () => {
    dispatch({
      type: "CHECK_OUT",
      payload: {
        products: [],
        itemCount: 0,
      },
    });
  };

  const galleryChange = (index, action) => {
    const stateProducts = state.products;
    if (action === "next") {
      stateProducts[index].currentImg < stateProducts[index].gallery.length - 1
        ? (stateProducts[index].currentImg += 1)
        : (stateProducts[index].currentImg = 0);
    }
    if (action === "previous") {
      stateProducts[index].currentImg <
        stateProducts[index].gallery.length - 1 &&
      stateProducts[index].currentImg === 0
        ? (stateProducts[index].currentImg =
            stateProducts[index].gallery.length - 1)
        : (stateProducts[index].currentImg -= 1);
    }
    dispatch({
      type: "GALLERY_CHANGE",
      payload: {
        products: stateProducts,
      },
    });
  };

  const value = {
    total: state.total,
    products: state.products,
    itemCount: state.itemCount,
    queryCurrencyIndex: state.queryCurrencyIndex,
    addToCart,
    removeFromCart,
    updateCurrencyType,
    updateItemAmount,
    checkOut,
    galleryChange,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
