import React from 'react'
import './home.css';
function home() {
    return (
        <div className="home-display">
            <div className="ad-div1">
                <h2>Standard</h2>
                <div className="ad-line">
                    <h3>Free</h3>
                </div>
                <div className="benefit">
                    <h1>Calorie Tracking</h1>
                </div>
                <h1>Body Weight update</h1>
                <div className="benefit">
                    <h1>Training Journal</h1>
                </div>
                <div className="ad-end">
                    <button>SELECT</button>
                </div>
            </div>
            <div className="ad-div2">
                <h2>Premium</h2>
                <div className="ad-line" >
                    <h3>10$</h3>
                    <h1>/Month</h1>
                </div>
                <div className="benefit">
                    <h1>Calorie Tracking</h1>
                </div>
                <h1>Body Weight update</h1>
                <div className="benefit">
                    <h1>Training Journal</h1>
                </div>
                <h1>Food Analysis</h1>
                <div className="benefit">
                    <h1>Calorie Goals by Meal</h1>
                </div>
                <h1>Quick Add Carbs, Protein and Fat</h1>
                <div className="benefit">
                    <h1>Ad-free</h1>
                </div>
                <div className="ad-end">
                    <button>SELECT</button>
                </div>
            </div>
        </div>
    )
}

export default home
