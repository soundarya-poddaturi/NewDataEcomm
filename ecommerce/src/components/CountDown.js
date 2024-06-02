import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import "./style.css"
const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const navigate=useNavigate();
    // Function to calculate time left until a specific date
    const calculateTimeLeft = () => {
        const endDate = new Date('June 11, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const difference = endDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds
            });
        } else {
            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        // Clear the timer when the component unmounts
        return () => clearInterval(timer);
    }, []);

    // Function to add leading zeros to single-digit numbers
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };
    const redirectToProductsAbove50PercentDiscount = () => {
        scrollToTop();
        const offerX=40;
        console.log(offerX);
        navigate('/products', { state: { offer: offerX } });
        
    }

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (                        
        <section className="py-10 bg-cover img-fluid imgx py-3 my-3 res" style={{ backgroundImage:  "url(" + require("../ImagesO/cover-8.jpg") + ")", backgroundSize: "cover" }}>
            <div className="container ">
                <div className="row justify-content-end">
                    <div className="col-12 col-md-8 col-lg-6  translucent-bg">

                        {/* <!-- Heading --> */}
                        <h3 className="mb-7 fw-bolder">
                            Get - 40%  from <br />Summer Collection
                        </h3>

                        {/* <!-- Counter --> */}
                        <div className="d-flex mb-9 my-3 " data-countdown="" data-date="Dec 31, 2025 00:00:00">
                            <div className="text-center">
                                <div className="fs-1 fw-bolder text-primary pri " data-days="">{formatTime(timeLeft.days)}</div>
                                <div className="heading-xxs text-muted pri">Days</div>
                            </div>
                            <div className="px-1 px-md-4">
                                <div className="fs-2 fw-bolder text-primary pri">:</div>
                            </div>
                            <div className="text-center">
                                <div className="fs-1 fw-bolder text-primary pri" data-hours="">{formatTime(timeLeft.hours)}</div>
                                <div className="heading-xxs text-muted pri">Hours</div>
                            </div>
                            <div className="px-1 px-md-4">
                                <div className="fs-2 fw-bolder text-primary pri">:</div>
                            </div>
                            <div className="text-center">
                                <div className="fs-1 fw-bolder text-primary pri" data-minutes="">{formatTime(timeLeft.minutes)}</div>
                                <div className="heading-xxs text-muted pri">Minutes</div>
                            </div>
                            <div className="px-1 px-md-4">
                                <div className="fs-2 fw-bolder text-primary pri">:</div>
                            </div>
                            <div className="text-center  ">
                                <div className="fs-1 fw-bolder text-primary pri" data-seconds="">{formatTime(timeLeft.seconds)}</div>
                                <div className="heading-xxs text-muted pri ">Seconds</div>
                            </div>
                        </div>

                        {/* <!-- Button --> */}
                       <button className="btn btn-dark nbtn my-3" onClick={redirectToProductsAbove50PercentDiscount}>Shop Now</button>  
                           

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountDown;
