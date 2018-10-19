import React from "react";
import CMS from "netlify-cms";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";


// Example of creating a custom color widget
class ColorControl extends React.Component {
  render() {
    return <input
        style={{height: "80px"}}
        type="color"
        value={this.props.value}
        onInput={(e) => this.props.onChange(e.target.value)}
    />;
  }
}

CMS.registerPreviewStyle("/css/main.css");
CMS.registerPreviewStyle("https://fonts.googleapis.com/css?family=Roboto|Teko");
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("blog", PostPreview);
CMS.registerWidget("color", ColorControl);
