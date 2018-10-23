import React from "react";
import format from "date-fns/format";

export default class PostPreview extends React.Component {
  render() {
    var entry = this.props.entry;
    var galleryHTML = '<div class="testing">';
    //var galleries = entry.getIn(['data', 'galleries']);
    // for(var i=0;i<galleries.length;i++){
    //   var rowNum=galleries[i].getIn(['data', 'rownum']);
    //   var bgSize='contain';
    //   if(galleries[i].getIn(['data', 'fullimage'])){
    //     bgSize='cover';
    //   }
    //   galleryHTML+='<section class="flex gallery">';
    //   galleryHTML+='<h1>'+galleries.getIn(['data', 'title'])+'</h1>'
    //   var entries = galleries[i].getIn(['data', 'gallery']);
    //   for(var j=0;j<entries.length;j++){
    //     galleryHTML+='<article class="image-holder cols-'+rowNum+'">';
    //     galleryHTML+='<div style="background-image:url('+entries[j].getIn(['data', 'image'])+');background-size:'+bgSize+'" data-image="'+entries[j].getIn(['data', 'image'])+'" class="image"></div>';
    //     galleryHTML+='</article>';
    //   }
    //   galleryHTML+='</section>';
    // }
    galleryHTML+='</div>';
    var parser = new DOMParser();
    var galleryDOM = parser.parseFromString(galleryHTML, "text/xml");
    return h('main', {},
      h('div', {"className": "content"},
      h('div', {"className": "galleries"}, galleryDOM)));
  }
}
