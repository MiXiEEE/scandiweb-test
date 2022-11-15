import React, { useState } from "react";

export default function AttribBtn(props) {
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
                      outline: "3px solid #5ece7b",
                      outlineOffset: "1px",
                    }
                  : { backgroundColor: item.value }
              }
              className={
                selected.select === artificialId
                  ? "attributes show-size"
                  : "attributes"
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
