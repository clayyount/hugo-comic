import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    var galleryHTML = [<main><div class="content">];
    var galleries = getAsset(entry.getIn(['data', 'galleries']));
    for(var i=0;i<galleries.length;i++){
      var rowNum=galleries[i].get('rownum');
      var bgSize='contain';
      if(galleries[i].get('fullimage')){
        bgSize='cover';
      }
      galleryHTML.push(<section class="flex gallery">);
      galleryHTML.push(<h1>{galleries.get('title')}</h1>);
      var entries = galleries[i].get('gallery');
      for(var j=0;j<entries.length;j++){
        galleryHTML.push(<article class="image-holder cols-{rowNum}">);
        galleryHTML.push(<div style="background-image:url({ entries[j].get('image')});background-size:{bgSize}" data-image="{entries[j].get('image')}" class="image"></div>';
        galleryHTML.push(</article>);
      }
      galleryHTML.push(</section>);
    }
    galleryHTML.push(</div></main>);
    return galleryHTML
  }
}
