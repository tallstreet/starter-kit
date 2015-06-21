import React from "react";

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require("./style.sass");

/*
  Reference an image and get back a URL automatically via webpack.
  webpack takes care of versioning, bundling for production, etc.
*/
const logoURL = require("./images/react-logo.svg");

export default class Header extends React.Component {
  render() {
    return <header className="HeaderComponent">
      <img className="HeaderComponent-logo" src={logoURL} height="125" />

      <div className="HeaderComponent-wrap">
        <h1 className="HeaderComponent-title">Tallstreet Starter Kit</h1>
        <h2 className="HeaderComponent-tagline">The simple things tied together</h2>
      </div>
    </header>;
  }
}
