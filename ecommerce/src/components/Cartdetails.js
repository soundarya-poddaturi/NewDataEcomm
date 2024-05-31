import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Cartdetails = ({ items }) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const promoCode = useSelector((state) => state.delivery.appliedPromoCode); // Get applied promo code from Redux store
  const promoCodes = useSelector((state) => state.delivery.promoCodes); // Get promo codes from Redux store
  const deliveryFee = useSelector((state) => state.delivery.deliveryFee);
 

  let total = subtotal;

  // Apply promo code discount if applicable
  if (promoCode && promoCodes[promoCode]) {
    const discountPercentage = promoCodes[promoCode];
    const promoCodeDiscount = (subtotal * discountPercentage) / 100;
    total -= promoCodeDiscount; // Deduct promo code discount from total
  }

  // Set delivery fee
  const calculatedDeliveryFee = subtotal < 100 ? deliveryFee : 0;
  total += calculatedDeliveryFee;

  const itemList = (item) => (
    <li className="list-group-item d-flex justify-content-between py-3 rounded-0" key={item.id}>
      <div className="title-container me-4">
        <h6 className="mb-0">{item.title}</h6>
      </div>
      <span className="text-muted">${item.price * item.quantity}</span>
    </li>
  );

  return (
    <div className=" mb-3 mx-2">
      <div className="card-body">
        <h4 className="card-title d-flex justify-content-between align-items-center mb-3">
          <span className="text-danger">Your cart</span>
          <span className="badge bg-primary rounded-pill">{totalQuantity}</span>
        </h4>
        <ul className="list-group mb-3">
          {items.map(itemList)}
          <li className="list-group-item d-flex justify-content-between py-3 rounded-0">
            <span className='text-primary'>Subtotal (USD)</span>
            <strong>${subtotal}</strong>
          </li>
          {promoCode && (
            <li className="list-group-item d-flex justify-content-between py-3 rounded-0">
              <div>
                <p className="text-primary mb-1">Promo Code</p>
                <small className="text-success">{promoCode}</small>
              </div>
              <strong>{promoCodes[promoCode]}%</strong>
            </li>
          )}
          <li className="list-group-item d-flex justify-content-between py-3 rounded-0">
            <span className='text-primary'>Delivery Fee</span>
            <strong>${calculatedDeliveryFee}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between py-3 rounded-0">
            <span className='text-primary'>Total (USD)</span>
            <strong>${total.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cartdetails;
