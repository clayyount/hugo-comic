import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    var entry = this.props.entry;
    var image = entry.getIn(['data', 'image']);
    var bg = this.props.getAsset(image) || "";
    return h('main', {},
      h('div', {"className": "content"},
      h('br', {}),
      h('h1', {}, entry.getIn(['data', 'title'])),
      h('img', {src: bg.toString()}),
      h('div', {"className": "text"}, this.props.widgetFor('body')))
    );
  }
}
