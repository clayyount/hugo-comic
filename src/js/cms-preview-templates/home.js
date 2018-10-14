import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let imageCSS = getAsset(entry.getIn(["data", "banner"]));
    

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (imageCSS && !imageCSS.fileObj) {
        imageCSS = window.parent.location.protocol + "//" + window.parent.location.host + imageCSS;
    }
    return <div>
        {imageCSS}
          <h1>
            {entry.getIn(["data", "title"])}
          </h1>
          <p class="subtitle">
            {entry.getIn(["data", "subtitle"])}
          </p>
        </div>
        <main>
        </main>
    </div>
  }
}