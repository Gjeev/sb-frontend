import "../../css/cart.css";
import { dropPaymentForm } from "./displayPaymentForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { layers } from "./layers";

export default function Cart({ gridId, onGridIdChange }) {
  function handleRemoveClick(index) {
    const newGridId = [...gridId];
    newGridId.splice(index, 1);
    onGridIdChange(newGridId);
  }

  const user = useSelector((state) => state.authReducer.user);
  const handleCheckoutButtonClick = () => {
    let paymentSessionId = "";
    axios
      .post("http://localhost:5000/order/:id", {
        order_id: "order_123", // some Math.Random() NOTE: ORDER ID'S ARE DIFFERENT FROM USER id's
        order_amount: cartPrice,
        order_currency: "INR",
        // need to get phone number and id
        customer_details: {
          customer_id: user._id,
          customer_name: user.name,
          customer_email: user.email,
          customer_phone: user.phone,
        },
        order_meta: {
          return_url: "", // make a profile page for user and redirect to that
        },
      })
      .then((res) => {
        paymentSessionId = res.data.paymentSessionId; // or res.paymentSessionId
      })
      .catch((err) => {
        console.log(err);
      });

    dropPaymentForm(paymentSessionId);
  };

  const [selectedLayers, setSelectedLayers] = useState([]);
  const [cartPrice, setCartPrice] = useState(gridId.length * 500);
  useEffect(() => {
    setCartPrice(gridId.length * 500);
  }, [gridId]);

  const handleLayerClick = (layer) => {
    if (selectedLayers.includes(layer)) {
      setSelectedLayers(selectedLayers.filter((l) => l !== layer));
    } else {
      setSelectedLayers([...selectedLayers, layer]);
    }
  };

  return (
    <div className="cart">
      <div className="cart-box">
        <div className="cart-header">Grids added to cart</div>
        <div className="cart-content">
          {gridId.map((grid, index) => (
            <>
              <div className="cart-item-list" key={index}>
                <div className="cart-item">{grid}</div>
                <div className="layer-checklist">
                  {layers.map((layer) => (
                    <>
                      <button
                        className={`layer-button${
                          selectedLayers.includes(layer) ? "-selected" : ""
                        }`}
                        onClick={() => handleLayerClick(layer)}
                      >
                        <span>{layer}</span>
                      </button>
                    </>
                  ))}
                </div>
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
            <div className="cart-price-value">INR {cartPrice}</div>
          </div>
        </div>
      </div>
      <div className="checkout">
        <button onClick={handleCheckoutButtonClick}>Proceed to checkout</button>
      </div>
    </div>
  );
}
