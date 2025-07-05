import React from "react"
import { Link } from "react-router-dom";
import "./todo.css";

export default function PagenotFound(){
    return(
    <div className="container">
        <div className="row"></div>
        <div className="row"></div> 
        <div className="row justify-content-center">
                 <div className="page">
                    <h3>PAGE NOT FOUND</h3>
                    <h5>Click Below</h5>
                    <Link to="/">
                    <button  className="btn submit-button px-4 py-2 mt-2" >Home</button>
                    </Link>
                 </div>
        </div>
    </div>
    );
}
