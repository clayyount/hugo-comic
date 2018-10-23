import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    var entry = this.props.entry;
    var galleryHTML = [<main><div class="content">];
    var galleries = entry.getIn(['data', 'galleries']);
    for(var i=0;i<galleries.length;i++){
      var rowNum=galleries[i].getIn(['data', 'rownum']);
      var bgSize='contain';
      if(galleries[i].getIn(['data', 'fullimage'])){
        bgSize='cover';
      }
      galleryHTML.push(<section class="flex gallery">);
      galleryHTML.push(<h1>{galleries.getIn(['data', 'title'])}</h1>);
      var entries = galleries[i].getIn(['data', 'gallery']);
      for(var j=0;j<entries.length;j++){
        galleryHTML.push(<article class="image-holder cols-{rowNum}">);
        galleryHTML.push(<div style="background-image:url({ entries[j].getIn(['data', 'image'])});background-size:{bgSize}" data-image="{entries[j].getIn(['data', 'image'])}" class="image"></div>';
        galleryHTML.push(</article>);
      }
      galleryHTML.push(</section></div></main>);
    }
    return galleryHTML
  }
}
