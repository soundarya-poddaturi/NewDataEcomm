import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./style.css"
const CartBtn = () => {
    const product = useSelector((state) => state.cart);
    const totalQuantity = product.items.reduce((acc, item) => acc + item.quantity, 0);
    // const totalQuantity = product.items.length;

    console.log(totalQuantity);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <>
            <NavLink to="/cart" className="position-relative me-2 outline-none" onClick={scrollToTop}>
                <span className="fa fa-shopping-bag fa-lg icon-small"></span>
                {totalQuantity > 0 && 
                    <span className="bg-dark position-absolute top-0 start-100 translate-middle  badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                        {totalQuantity}
                    </span>
                }
            </NavLink>
        </>
    );
};

export default CartBtn;
