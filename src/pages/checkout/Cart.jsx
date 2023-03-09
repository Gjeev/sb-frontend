import "../../css/cart.css";
import { useState } from "react";
export default function Cart({gridId, onGridIdChange}) {

  function handleRemoveClick(index) {
    const newGridId = [...gridId];
    newGridId.splice(index, 1);
    onGridIdChange(newGridId);
  }
  return (
    <div className="cart">
      <div className="cart-box">
        <div className="cart-header">Grids added to cart</div>
        <div className="cart-content">
          {gridId.map((grid, index) => (
            <>
              <div className="cart-item-list" key={index}>
                <div className="cart-item">{grid}</div>
                <div className="cart-item-remove">
                  <button onClick={handleRemoveClick.bind(this, index)}>
                    remove
                  </button>
                </div>
              </div>
            </>
          ))}
          <div className="cart-price">
            <div className="cart-price-text">Total Price</div>
            <div className="cart-price-value">INR {gridId.length * 500}</div>
          </div>
        </div>
      </div>
      <div className="checkout">
        <button>Proceed to checkout</button>
      </div>
    </div>
  );
}
