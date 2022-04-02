import react from "react";
import  ReactDOM  from "react-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";


ReactDOM.render(
    <BrowserRouter>
       <App/>
        </BrowserRouter>
    ,document.querySelector("#root"));