import React from "react";
import CMS from "netlify-cms";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import GalleryPreview from "./cms-preview-templates/gallery";



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

CMS.registerPreviewStyle("/scss/main.min.css");
CMS.registerPreviewStyle("https://fonts.googleapis.com/css?family=Roboto|Teko");
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("blog", PostPreview);
CMS.registerPreviewTemplate("gallery", GalleryPreview);
CMS.registerPreviewTemplate("hamlets-danish-comic", PostPreview);
CMS.registerPreviewTemplate("ghostcat-comics-archive", PostPreview);
CMS.registerPreviewTemplate("raecomic", PostPreview);
CMS.registerWidget("color", ColorControl);
