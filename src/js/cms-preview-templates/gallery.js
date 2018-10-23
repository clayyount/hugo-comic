import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    var entry = this.props.entry;
    var galleryHTML = '<div class="testing">';
    var galleries = entry.getIn(['data', 'galleries']);
    
    galleryHTML+='</div>';
    var parser = new DOMParser();
    var galleryDOM = parser.parseFromString(galleryHTML, "text/xml");
    return h('main', {},
      h('div', {"className": "content"},
      h('div', {"className": "galleries"}, galleryDOM)));
  }
}
