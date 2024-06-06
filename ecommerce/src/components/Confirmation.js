import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
    return (
        <section className="py-12">
            <div className="container">
                <div className="row justify-content-center d-flex align-item-center p-xxl-5 ">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center p-xxl-5">
                        {/* Icon */}
                        <div className="mb-7 fs-1">❤️</div>

                        {/* Heading */}
                        <h2 className="mb-5">Your Order is Completed!</h2>

                        {/* Text */}
                        <p className="mb-7 text-gray-500">
                            Your order  has been completed. Your order details
                            are shown for your personal account.
                        </p>

                        {/* Button */}
                        <Link to="/profile" className="btn btn-dark" onClick={scrollToTop}>View My Orders</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Confirmation;
