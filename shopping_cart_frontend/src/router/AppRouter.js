import React, { Component } from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";

export class AppRouter extends Component {
  render() {
    return (
      <Routes>
          <Route path={"/"} element={<Home/>}></Route>
          <Route path={"/cart"} element={<Cart/>}></Route>
          <Route path={"/payment"} element={<Payment/>}></Route>
      </Routes>
    )
  }
}

export default AppRouter
