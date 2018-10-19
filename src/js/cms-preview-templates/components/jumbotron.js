import React from "react";

export default class Jumbotron extends React.Component {
  render() {
    const {image, title, subtitle} = this.props;

    return <div>
      <div className="jumbotron" style={{
        backgroundImage: image && `url(${image})`
      }}>
        <h1>
                { title }
        </h1>
      </div>;
  }
}