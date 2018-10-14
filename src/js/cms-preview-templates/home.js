import React from "react";
import format from "date-fns/format";
var jumboHTML=='<div class="jumbotron"';
export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "banner"]));
    let title = getAsset(entry.getIn(["data", "title"]));
    let subtitle = getAsset(entry.getIn(["data", "subtitle"]));
    

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
        image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }
    if(image){
      jumboHTML+=' style="background-image: url('+image+')"';
    }
    jumboHTML+='>';
    if(title){
      jumboHTML+='<h1>'+title+'</h1>';
    }
    if(subtitle){
      jumboHTML+='<p>'+subtitle+'</p>';
    }
    jumboHTML+='</div>';

    return <div>
   
        {jumboHTML}
        <main>

        </main>
    </div>
  }
}