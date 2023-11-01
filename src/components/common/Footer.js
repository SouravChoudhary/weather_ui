// src/components/common/Footer.js
import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
    };
  }

  componentDidMount() {}

  render() {
    return (
      <footer>
        <p>&copy; {this.state.year} Weather App</p>
      </footer>
    );
  }
}

export default Footer;
