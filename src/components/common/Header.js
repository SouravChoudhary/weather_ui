import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "My Weather App",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <header>
        <h1>{this.state.title}</h1>
      </header>
    );
  }
}

export default Header;
