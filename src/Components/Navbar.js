import React, { Component } from 'react'

export default class Navbar extends Component {

  render() {
    return (
      <>
      <header>
        <div className="logo" style={{color: "black", fontWeight: "600", fontFamily: "sans-serif", }}>
        </div>
        <input type="checkbox" id="nav_check" hidden />
        <nav>
            <ul>
                <li>
                    <a href="" className="active">Home</a>
                </li>
                <li>
                    <a href="">Portfolio</a>
                </li>
                <li>
                    <a href="">Blog</a>
                </li>
                <li>
                    <a href="">Services</a>
                </li>
                <li>
                    <a href="">About</a>
                </li>
            </ul>
        </nav>
        <label htmlFor="nav_check" className="hamburger">
            <div></div>
            <div></div>
            <div></div>
        </label>
    </header>
      </>
    )
  }
}
