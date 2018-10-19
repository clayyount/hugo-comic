import React from "react";

export default class Jumbotron extends React.Component {
  render() {
    const {image, title, subtitle} = this.props;

    return <div className="jumbotron" style={{
        backgroundImage: image && `url(${image})`
      }}> 
        <h1 className="f2 f1-l b di lh-title mb3 white mw6 bg-primary">
          { title }
        </h1>
    </div>;
  }
}