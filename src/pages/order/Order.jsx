import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// basic template to check if the payment route successfully redirected
// style this page later

export default function Order({}) {
  const { order_id } = useParams();
  const [orderData, setOrderData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/order/${order_id}`);
          setOrderData(response.data);
        } catch (error) {
          console.error("error in frontend accessing the db for order details", error);
        }
      };
  
      fetchData();
      console.log(orderData)
  }, [order_id]);
  return (
    <>
        <div>
            <h1>Order Details</h1>
            <h2>Order ID: {orderData?.order_id}</h2>
            <h2>Order Amount: {orderData?.order_amount}</h2>
            <h2>Order Currency: {orderData?.order_currency}</h2>
            <h2>Customer ID: {orderData?.customer_details.customer_id}</h2>
            <h2>Customer Name: {orderData?.customer_details.customer_name}</h2>
            <h2>Customer Email: {orderData?.customer_details.customer_email}</h2>
            <h2>Customer Phone: {orderData?.customer_details.customer_phone}</h2>
            <h2>Order Status: {orderData?.payment_status}</h2>
        </div>
    </>
  );
}
