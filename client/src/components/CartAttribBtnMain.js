import React, { useState } from "react";

export default function CartAttribBtn(props) {
  const { attrbItemId, items } = props;

  const [selected, setSelected] = useState({
    select: "",
  });

  const handleSelect = (id, color) => {
    setSelected({
      select: id,
      color: color,
    });
  };

  return (
    <>
      <div className="btn-row">
        {items.map((item) => {
          let artificialId = `${attrbItemId}_${item.id}`;
          return (
            <span
              onClick={() => {
                handleSelect(artificialId, item.value);
              }}
              style={
                item.value[0] === "#" && item.value === selected.color
                  ? {
                      backgroundColor: item.value,
                      outline: "2px solid #5ece7b",
                      outlineOffset: "1px",
                    }
                  : {
                      backgroundColor: item.value,
                      width: "63px",
                      height: "45px",
                    }
              }
              className={
                selected.select === artificialId
                  ? "attributes-cart-main show-size"
                  : "attributes-cart-main"
              }
              key={artificialId}
            >
              {item.value[0] !== "#" ? item.value : null}
            </span>
          );
        })}
      </div>
    </>
  );
}
