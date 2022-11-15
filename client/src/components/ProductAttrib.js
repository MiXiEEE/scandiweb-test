import React from "react";
import AttribBtn from "./AttribBtn";

export default function ProductAttrib(props) {
  const { data } = props;

  return (
    <>
      {data.length !== 0
        ? data?.map((attrib) => {
            const attrbItemId = attrib.id;
            return (
              <div className="product-attributes" key={attrib.id}>
                <h3>{attrib.id}</h3>
                <AttribBtn attrbItemId={attrbItemId} items={attrib.items} />
              </div>
            );
          })
        : null}
    </>
  );
}
