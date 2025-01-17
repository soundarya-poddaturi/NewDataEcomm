import React from "react";

const PaymentForm = () => {
    const handleSubmit = (e) => {
        console.log("svcv");
        e.preventDefault();
        // const form = e.target;
        // const formData = new FormData(form);
        // const formValues = Object.fromEntries(formData.entries());
        // console.log("Form Values:", formValues);
        // handleCheckOut();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
                <div className="form-check">
                    <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        value="credit"
                        required
                    />
                    <label className="form-check-label" htmlFor="credit">
                        Credit card
                    </label>
                </div>
                <div className="form-check">
                    <input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        value="debit"
                        required
                    />
                    <label className="form-check-label" htmlFor="debit">
                        Debit card
                    </label>
                </div>
                <div className="form-check">
                    <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        value="paypal"
                        required
                    />
                    <label className="form-check-label" htmlFor="paypal">
                        PayPal
                    </label>
                </div>
            </div>

            <div className="row gy-3">
                <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                        Name on card
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        name="ccName"
                        placeholder=""
                        required
                    />
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">Name on card is required</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                        Credit card number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        name="ccNumber"
                        placeholder=""
                        required
                    />
                    <div className="invalid-feedback">Credit card number is required</div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        name="ccExpiration"
                        placeholder=""
                        required
                    />
                    <div className="invalid-feedback">Expiration date required</div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                        CVV
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        name="ccCVV"
                        placeholder=""
                        required
                    />
                    <div className="invalid-feedback">Security code required</div>
                </div>
            </div>

            <hr className="my-4" />

            {/* <button
                className="w-100 btn btn-danger btn-lg"
                type="submit"
            >
                Continue to checkout
            </button> */}
        </form>
    );
};

export default PaymentForm;
