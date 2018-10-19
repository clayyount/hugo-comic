import React from "react";
import format from "date-fns/format";
import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    var entry = this.props.entry;
    var banner = entry.getIn(['data', 'banner']);
    var body = this.props.widgetFor('body');
    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (banner && !banner.fileObj) {
        banner = window.parent.location.protocol + "//" + window.parent.location.host + banner;
    }
    return <div className="flex">
      <Jumbotron image={banner} title={entry.getIn(["data", "title"])} />
      <main>
        {body}
      </main>
    </div>;
  }
}