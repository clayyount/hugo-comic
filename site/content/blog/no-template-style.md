---
title: 'The Best Style is No-Template Style'
date: Wed, 12 Aug 2015 13:18:34 +0000
draft: false
tags: [Squarespace, website, webcomic, template]
image: /img/ss-logo.jpg
---

### IMPORTANT UPDATE: 

**Due to an undocumented limit on Squarespace's Archive List block, the current solution will not work with >1000 comics in the archive. If your comic archives are more than 1000, or you will reach it soon, please find another solution. I'm sorry to have launched with this limitation, but I didn't have an archive with 1000 entries to test on and it wasn't documented, so I wasn't aware of it. I'm hoping Squarespace will implement a fix to a separate bug with their itemCount API so I can use a workaround, but it's been more than 6 months since I alerted them and they have yet to inform me when a fix is coming. As it stands, there is no way around this limitation.**


At the beginning of the year, I released a Squarespace template for webcomic artists. The response has been pretty good, and hopefully some of you have put it to good use. I've gotten some feedback, and the two biggest complaints are that the (recently increased) $18 per month developer account is too expensive, and the template is too hard to customize for someone without a lot of coding skills.

Since I released the template, Squarespace has made some important updates to their platform that have allowed me to create a new easier solution that doesn't require a custom template and just uses some copy and paste code. This means it'll work with ANY Squarespace plan including the $8/month basic plan. I've put together some video tutorials to help you get the basics of a site up and running in about 30 minutes. I'll be adding some more videos as I complete them, and am willing to [take suggestions](/contact) for tutorial topics. If you are a web developer and want 100% control, you can still use my [original template](/template) as a launching off point, but this new solution is incredibly versatile and I think it is the best option for 99% of people.

Just an FYI, I am nowhere near as practiced as my brother as speaking into a microphone, so please excuse my nervousness. I didn't have time to do multiple takes, so I just kind of winged it.

Watch the following videos in order to get your site set up:
{{< youtube J2tj8_gUlg0 >}}
### OVERVIEW
This is an overview of a demo webcomic website I made using Squarespace's trial account. Take a look at some of the functionality and features that you'll have access to.
&nbsp;\
&nbsp;\
&nbsp;\
{{< youtube g8uncSaFOfw >}}
### INITIAL SETUP
This takes you through the initial setup process for the Five template with my custom code snippits. It also goes over how to add a comics page with some comics, a blog page and an archive page, as well as some basic template style editing.
&nbsp;\
&nbsp;\
&nbsp;\
{{< youtube k_ctYDQOCt4 >}}
### STYLE EDITOR
This goes more in depth into using Squarespace's Style Editor to design your site to be an effective webcomic site.
&nbsp;\
&nbsp;\
&nbsp;\
{{< youtube g8kPuVdq7Mo >}}
### RESPONSIVE ADS
How to add responsive ads to your site for Google and Project Wonderful.
&nbsp;\
&nbsp;\
&nbsp;\
{{< youtube WwMmAeXlSNU >}}
### CHAPTER SUPPORT
How to set up your site to support chapters for longform comics
&nbsp;\
&nbsp;\
&nbsp;\
{{< youtube 9bXtSSZApIU >}}
### CUSTOM CSS
How to edit the Custom CSS (LESS) to add your own styles for specific pages/collections. it might get a little tricky for people completely unfamiliar with HTML/CSS and how to use the inspector.
&nbsp;\
&nbsp;\
&nbsp;\
&nbsp;\
Here are the code snippets you'll need:

### Header Code:
~~~~
<script>
	/*

 HEADER INJECTION CODE
 ----------------------
 This code is meant to be placed in the header code injection area of your Squarespace console.
 From the home menu, navigate to: 
 Settings > Advanced > Code Injection
 and paste this code in the "Header" section.

 */

	/\* 
 USER DEFINED VARIABLES
 -----------------------
 These variables are can be defined by you.

 comicNavButtons: An array of your comic nav buttons in order. Options are:
 'first' : takes you to the first comic in a collection
 'prev' : takes you to the previous comic in a collection
 'random' : takes you to a random comic in a collection
 'next' : takes you to the next comic in a collection
 'today' : takes you to the most recent comic in a collection
 'chapter' : takes you to the start of the current chapter

 homepageBottomSlug: the url slug for the page content for the bottom of the homepage.
  
 */
	
	var comicNavButtons=\['first','prev','random','next','today'\];
	var homepageBottomSlug="homepage-bottom";
	
	/*------OTHER VARIABLES------*/
	var allComics=\[\],firstLink,todayLink,prevLink,nextLink,randomLink,comicNav,itemCount,pageSize,categories,chapterCategory,comicUrlSlug,currentComic;

	/*------CHECKS IF THE PAGE IS A SEARCH RESULT------*/
	var isSearchURL=false;
 	var search=window.location.search;
 	if(search.indexOf("tag=")!=-1 || search.indexOf("category=")!=-1 || search.indexOf("author=")!=-1 || search.indexOf("offset=")!=-1 || search.indexOf("page=")!=-1 || search.indexOf("month=")!=-1 || search.indexOf("year=")!=-1){
 		isSearchURL=true;
 	}

	/*------WAITS FOR THE PAGE LOGO TO LOAD------*/
	Y.on("contentready",function(){
	
		/*------ADDS THE LOGO TO THE MOBILE NAV BAR------*/
		var mobileNavTitle=Y.one('.has-logo-image #mobile-navigation-title');
		var bannerImg=Y.one('.has-logo-image #canvas #banner-wrapper');
		if(mobileNavTitle && bannerImg){
			mobileNavTitle.insert(bannerImg.getHTML(),'after');
		}
	},'#banner-wrapper');

	/*------WAITS FOR THE DOM TO LOAD------*/
	Y.on("domready",function(){
		var pagination=Y.one("body.view-item .pagination,body.view-list .pagination");	
		
		/*-----RESIZE THE RESPONSIVE ADS ON PAGE LOAD------*/
		resizeAds();
		
		/*------MAKES THE SUMMARY TITLES INTO HEADINGS------*/
		fixSummaryTitles();

		archiveList=Y.one('.collection-type-blog .sqs-block-archive');
		if(!archiveList && pagination){
			pagination.setStyle("display","block");
		}		
		
		/*------GET THE COMIC CURRENT COMIC LINK, AND URL SLUG FROM THE FIRST OBJECT------*/
		var titleObj=Y.one('article header>.entry-title>a')
		if(titleObj){
			currentComic=titleObj.getAttribute("href");
		}
        /*------IF THERE IS A COMIC DATA ARRAY, AND THE PAGE IS NOT A SEARCH RESULT...------*/      
		if(!isSearchURL && archiveList){
			Y.one("body").addClass("has-comic-nav");
			/*------HIDE THE DEFAULT PAGINATION------*/
			if(pagination){
				pagination.setStyle("display","none");
			}
			if(currentComic){
				comicUrlSlug=currentComic.split("/")\[1\];
			}
			Y.all(".main-content article.hentry:not(:first-of-type)").remove();
			if(Y.one("body.view-list")){
				Y.io('/'+homepageBottomSlug+'?format=main-content&cacheBust='+String(Math.ceil(Math.random()*1e11)), {
			        on:{success: homepageBottomHTMLLoaded}
			    });
			}
		}else{
			Y.all(".main-content article.hentry:not(:first-of-type)").setStyle("display","block");
			if(pagination){
				pagination.setStyle("display","block");
			}
		}



		/*------CREATES COMIC DATA ARRAY FROM THE ARCHIVE LIST IN THE PAGE HEADER------*/
		
		Y.all('.collection-type-blog #page-body-header .sqs-block-archive ul .archive-item-link').each(function(){
			allComics.push({
							title:this.get('text'),
							link:this.getAttribute('href')
						});

		});

		/*------ADDS SOME CLASSES TO THE BODY TELLING IF THERE IS A COMIC DATA ARRAY------*/
        if(allComics.length>0 && !isSearchURL){
        	Y.one("body").addClass("has-comic");
        	/*------USE THE COMIC DATA ARRAY TO GET FIRST, TODAY, RANDOM, PREVIOUS AND NEXT LINKS------*/
			firstLink=allComics\[allComics.length-1\].link;
			todayLink=allComics\[0\].link;
			randomLink=allComics\[Math.floor(Math.random()*allComics.length)\].link;
			for(var i=0;i<allComics.length;i++){
				if(allComics\[i\].link==currentComic){
					if(allComics\[i+1\]){
						prevLink=allComics\[i+1\].link
					}
					if(allComics\[i-1\]){
						nextLink=allComics\[i-1\].link
					}
				}
			}
			/*------BUILD THE COMIC NAV AND ADD IT TO THE PAGE------*/
			buildComicNav();
    	}else{
        	Y.one("body").addClass("no-comic");
        }
        /*------GET THE CATEGORIES FROM THE FIRST ARTICLE------*/
		if(comicNavButtons.indexOf("chapter")!=-1){
			if(prevLink){
				var prevPageChapterJsonURL=prevLink+'?format=json&cachebust='+String(Math.ceil(Math.random()*1e11));
				Y.io(prevPageChapterJsonURL, {
			        on:{success: prevPageChapterJsonLoaded}
			    });
			}
		}
		/*-----LOAD ALL IMAGES AT THE OPTIMAL SIZES------*/
    	setImageLoader();

    	/*------IF THERE ARE GOOGLE ADS, TRY AND LOAD THEM ON THE PAGE------*/
    	var isGoogAd=Y.one('.adsbygoogle');
    	if(isGoogAd){
			loadGoogleCode();
			Y.all('.adsbygoogle').each(function(){
				try{
					(adsbygoogle = window.adsbygoogle || \[\]).push({});
				}catch(e){}
			});
		}
		
		/*------IF THERE ARE PROJECT WONDERFUL ADS, TRY AND LOAD THEM ON THE PAGE------*/
		var isPwAd=Y.one('div\[id*="pw_adbox"\]');
		if(isPwAd){
			try{
				loadPWCode();
			}catch(e){}
		}
    });
	/*------FUNCTION THAT BUILDS AND ATTACHES THE COMIC NAVIGATION BASED ON THE comicNavButtons VARIABLE------*/
	function buildComicNav(){
		comicNav='<div class="comic-nav" id="comic-nav">';
		for(var i=0;i<comicNavButtons.length;i++){
			comicNav+='<span class="sqs-block-button button-block sqs-block"><span class="sqs-block-button-content"><span class="sqs-block-button-container--center"><a class="sqs-editable-button sqs-block-button-element--small sqs-block-button-element comic-nav-btn'
			switch(comicNavButtons\[i\]){
				case "first":
    				comicNav+=' first-btn';
    				if(prevLink){
    					comicNav+='" href="'+firstLink+'" title="First Comic">';
    				}else{
    					comicNav+=' disabled" title="First Comic">';
    				}
    				comicNav+='<i class="icon-fast-backward"></i> <span class="button-text">First</span>';
				break;
				case "prev":
					comicNav+=' prev-btn';
    				if(prevLink){
    					comicNav+='" href="'+prevLink+'" title="Previous Comic">';
    				}else{
    					comicNav+=' disabled" title="Previous Comic">';
    				}
    				comicNav+='<i class="icon-chevron-left"></i> <span class="button-text">Prev</span>';
				break;
				case "chapter":
					comicNav+=' chapter-btn';
					comicNav+=' disabled" title="Chapter Start">';
    				comicNav+='<i class="icon-step-backward"></i> <span class="button-text">Chapter</span>';
				break;
				case "random":
					comicNav+=' random-btn';
					comicNav+='" href="'+randomLink+'" title="Random Comic">';
    				comicNav+='<i class="icon-random"></i> <span class="button-text">Random</span>';
				break;
				case "next":
					comicNav+=' next-btn';
					if(nextLink){
    					comicNav+='" href="'+nextLink+'" title="Next Comic">';
    				}else{
    					comicNav+=' disabled" title="Next Comic">';
    				}
    				comicNav+='<span class="button-text">Next</span> <i class="icon-chevron-right"></i>';
				break;
				case "today":
					comicNav+=' today-btn';
					if(nextLink){
    					comicNav+='" href="'+todayLink+'" title="Today\\'s Comic">';
    				}else{
    					comicNav+=' disabled" title="Today\\'s Comic">';
    				}
					comicNav+='<span class="button-text">Today</span> <i class="icon-fast-forward"></i>';
				break;
			}
			comicNav+='</a></span></span></span>'; 
		}
	    comicNav+='</div>';
	    /*------ADD THE COMIC NAV ABOVE AND BELOW THE COMIC------*/
	    Y.one('article .entry-content .image-block-wrapper').insert('<div class="top-comic-nav-wrapper">'+comicNav+'</div>',"before");
	    Y.one('article .entry-content .image-block-wrapper').insert('<div class="bottom-comic-nav-wrapper">'+comicNav+'</div>',"after");
	    

	    /*------SET THE WIDTH OF THE BUTTONS ON MOBILE BASED ON BUTTON NUMBER------*/
	    Y.one('head').append(Y.Node.create('<style>@media screen and (max-width:760px){.comic-nav .sqs-block-button{width:'+(100/(comicNavButtons.length))+'%;}}</style>'));
	    setImageLoader();
	}
	//Function to load the homepage-bottom page contents in the homepage below the comic.
	/*------FUNCTION TO LOAD THE homepage-bottom PAGE CONTENTS BELOW THE MAIN CONTENT OF THE HOMEPAGE------*/
	function homepageBottomHTMLLoaded(err,data){
		Y.one('.main-content').insert('<div class="homepage-bottom">'+data.response+'</div>',"after");
		/*------RE-INITIALIZE ALL SQUARESPACE CONTENT IN homepage-bottom AFTER THE CONTENT LOADS------*/
		Squarespace.globalInit(Y);
		fixSummaryTitles();
		resizeAds();
		/*------IF THERE ARE GOOGLE ADS, TRY AND LOAD THEM IN THE LOADED homepage-bottom------*/
		var isGoogAd=Y.one('.homepage-bottom  .adsbygoogle');
    	if(isGoogAd){
			loadGoogleCode();
			Y.all('.homepage-bottom  .adsbygoogle').each(function(){
				try{
					(adsbygoogle = window.adsbygoogle || \[\]).push({});
				}catch(e){}
			});
		}

		/*------IF THERE ARE PROJECT WONDERFUL ADS, TRY AND LOAD THEM IN THE LOADED homepage-bottom------*/
		var isPwAd=Y.one('.homepage-bottom  div\[id*="pw_adbox"\]');
		if(isPwAd){
			try{
				loadPWCode();
			}catch(e){}
		}
	}
	/*------RESET ALL IMAGES ON THE PAGE TO ALLOW DYNAMIC RESIZING------*/
	function setImageLoader(){
		Y.all('img\[data-src\]').setAttribute("data-load","true").each(function(img) {
		    ImageLoader.load(img);
		});
	}
	/*------USE AJAX TO GET THE CHAPTER START LINK------*/
	function getChapterStartLink(){
		if(chapterCategory && prevLink){
			var chapterStartJsonURL='/'+comicUrlSlug+'/?format=json&tag=chapter+start&category='+chapterCategory+'&cachebust='+String(Math.ceil(Math.random()*100000000000));
			Y.io(chapterStartJsonURL, {
		        on:{success: chapterStartJsonLoaded}
		    });
		}
	}
	/*------GET CATEGORIES FOR THE PREVIOUS PAGE------*/
	function prevPageChapterJsonLoaded(err,data){		
		var jsonResponse = Y.JSON.parse(data.responseText);		
		if(jsonResponse){
			categories=jsonResponse.item.categories;
			if(!categories){
				categories=\[\];
			}			
			/*------SEE IF THERE IS A CATEGORY WITH "CHAPTER" IN IT------*/
			for(var i=0;i<categories.length;i++){
				/*------IF THERE IS, GET THE CHAPTER START LINK------*/
				if(categories\[i\].toLowerCase().indexOf("chapter")!=-1){
					chapterCategory=categories\[0\].split(" ").join("+");
				}
			}
			getChapterStartLink();
		}	    	
	}
	/*------INITIALIZE THE CHAPTER START BUTTON------*/
	function chapterStartJsonLoaded(err,data){
		var jsonResponse = Y.JSON.parse(data.responseText);
		if(jsonResponse){
			var chapterStartItem=jsonResponse.items\[0\]
			var chapterStartLink=chapterStartItem.fullUrl;
			Y.all("a.chapter-btn").removeClass('disabled').setAttribute('href',chapterStartLink);
		}
	}
	/*------REFORMAT SUMMARY TITLES TO BE H1, H2, H3, DEPENDING ON THE DISPLAY SIZE------*/
	function fixSummaryTitles(){
		if(Y.one(".summary-title")){
			Y.all(".summary-block-setting-text-size-extralarge .summary-title").each(function(){
				this.setHTML('<h1 class="extra-large">'+this.getHTML()+'</h1>')
			});
			Y.all(".summary-block-setting-text-size-large .summary-title").each(function(){
				this.setHTML('<h1>'+this.getHTML()+'</h1>')
			});
			Y.all(".summary-block-setting-text-size-medium .summary-title").each(function(){
				this.setHTML('<h2>'+this.getHTML()+'</h2>')
			});
			Y.all(".summary-block-setting-text-size-small .summary-title").each(function(){
				this.setHTML('<h3>'+this.getHTML()+'</h3>')
			});
		}
	}
	/*------FUNCTION TO USE CSS TO RESIZE RESPONSIVE ADS TO FIT WHATEVER CONTAINER THEY ARE IN. NECESSARY FOR ADS ON MOBILE.------*/
	function resizeAds(){
			Y.all(".section-ad-wrapper").each(function(){
				var responsiveAd=this.one('.responsive-ad')
				if(responsiveAd){
					strAdWidth=responsiveAd.getAttribute('data-width')
					strAdHeight=responsiveAd.getAttribute('data-height')
					if(strAdWidth.length>0){
						var adWidth=parseInt(strAdWidth, 10);
					}else{
						var adWidth=728;
					}
					if(strAdHeight.length>0){
						var adHeight=parseInt(strAdHeight, 10);
					}else{
						var adHeight=90;
					}
					responsiveAd.setStyles({
					    'height':(adHeight)+'px',
					    'width':(adWidth)+'px'
					});
					var containerWidth=parseInt(this.getComputedStyle("width"), 10)
					var scaleRatio=1;
					this.setStyles({
					    'visibility':'visible'
					});
					if(containerWidth<adWidth){
						scaleRatio=(containerWidth/adWidth);
						this.setStyles({
						    'height':(adHeight*scaleRatio)+'px'
						});
						responsiveAd.setStyles({
							'transform': 'translateX(50%) translateY(50%) scale('+scaleRatio+','+scaleRatio+')',
						    'bottom': '50%',
						    'right': '50%',
						    'position':'absolute'
						});
					}else{
						this.setStyles({
						    'height':(adHeight)+'px'
						});
						responsiveAd.setStyles({
							'transform': 'none',
						    'bottom': '0',
						    'right': '0',
						    'position':'relative'
						});
					}
				}
			})
	}
	
	function loadExtScript(str){
			var scriptElem=document.createElement('script');
			var firstScriptTag=document.getElementsByTagName('script')\[0\];
			scriptElem.type='text/javascript';
			scriptElem.async=true;
			scriptElem.src=str;
			firstScriptTag.parentNode.insertBefore(scriptElem,firstScriptTag);
	}
	function loadPWCode(){
		loadExtScript('//www.projectwonderful.com/pwa.js')
	}
	function loadGoogleCode(){
		if(!window.adsbygoogle){
			loadExtScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
		}
	}

	/*------RESIZE ADS ON WINDOW RESIZE------*/
	window.onresize = function(event) {
		resizeAds();
	};
</script>
~~~~
### Custom CSS:
~~~~
/*

 CUSTOM CSS CODE
 ----------------------
 This code is meant to be placed in the Custom CSS section of your Squarespace console.
 From the home menu, navigate to: 
 Design > Custom CSS
 and paste it input field.

 You can also add your own custom CSS code in the designated areas below.

*/

/*------YOUR CUSTOM CSS STYLES------*/

/*------END CUSTOM CSS STYLES------*/

/*------USE THESE CLASSES TO HIDE THE TOP OR BOTTOM COMIC NAVIGATION------*/

/*

.top-comic-nav-wrapper .comic-nav{
 display:none; 
}

.bottom-comic-nav-wrapper .comic-nav{
 display:none;
}

*/
/*------I'M HIDING THE NAVIGATION ABOVE THE COMIC BY DEFAULT------*/
.top-comic-nav-wrapper .comic-nav{
  display:none; 
}

h1,h2,h3{
  overflow: hidden;
}

/*------HELPER CLASSES------*/
.hidden{
  display:none !important;
}
.visible{
  display:block !important;
}
.responsive-image{
  max-width:100%;
}
/*------END HELPER CLASSES------*/

/*------HIDE ALL BUT THE LATEST COMIC ON THE HOMEPAGE------*/
.homepage .main-content article.hentry:not(:first-of-type){
  display:none;
}
/*------HIDE THE ARCHIVE LIST IN THE PAGE HEADER------*/
.collection-type-blog #page-body-header .sqs-block-archive{
  display:none;
}
.collection-type-blog.sqs-edit-mode #page-body-header .sqs-block-archive{
  display:block;
  background:#eee;
  border:2px dashed #dddddd;
  padding:17px;
  margin:17px;
  &:before{
    content:"comic navigation archive block"
  }
  .sqs-block-content{
        display:none;
  }
}

/*------HIDE THE PAGEINATION ON PAGE LOAD------*/
.pagination{
  display:none;
}

/*------COMIC NAVIGATION STYLES------*/
.comic-nav-btn, .comic-nav-btn:link, .comic-nav-btn:visited{
  display:inline-block;
  padding:10px 10px !important;
  box-sizing: border-box;
}
.comic-nav-btn.disabled{
  opacity:.5;
  pointer-events:none;
}

.comic-nav{
  text-align:center;
  background-color: transparent;
  padding:10px 20px;
  margin:0px -20px 0px;
}
.comic-nav .sqs-block-button{
  padding:0px 3px;
  display:inline-block;
  box-sizing:border-box;
}

/*------SPACE BETWEEN THE HOMEPAGE BOTTOM AND THE HOMEPAGE MAIN CONTENT------*/
.homepage-bottom{
  padding-top:20px;
}

/*------MAKE SUMMARY EXCERPT TEXT MATCH THE BODY STYLES------*/
.summary-excerpt p{
  line-height:inherit !important;
  font-size:inherit !important;
}

/*------DESKTOP SIZE RESPONSIVE AD STYLES------*/
.section-ad-wrapper{
  position:relative;
  visibility:hidden;
  overflow:hidden;
}
.responsive-ad{
  width:attr(data-width);
  height:attr(data-height);
  box-sizing:border-box;
  text-align:center;
  margin:0 auto;
  overflow:hidden;
}
.responsive-ad.align-right{
  margin:0 0 0 auto;
}
.responsive-ad.align-left{
  margin:auto 0 0 0;
}

/*------DEFAULT HIDE THE MOBILE LOGO------*/
#mobile-navigation{
   #banner{
          display:none;
    }
}

/*------MEDIA QUERIES------*/

/*------SMALLER THAN IPAD------*/
@media screen and (max-width:767px){
  /*------HELPER CLASSES------*/
  .hidden-sm{
    display:none !important;
  }
  .visible-sm{
    display:block !important;
  }
  /*------END HELPER CLASSES------*/

  /*------YOUR CUSTOM MOBILE CSS STYLES------*/

  /*------END CUSTOM MOBILE CSS STYLES------*/

  /*------UNCOMMENT THIS CODE TO SHOW THE LOGO ON MOBILE SIZE------*/
  /*
  
 .has-logo-image{
 #mobile-navigation{
 padding:0px;
 min-height:60px;
 box-sizing:border-box;
 #mobile-navigation-title{
 display:none;
 }
 #banner{
 display:inline-block;
 max-height:60px;
 }
 }
 }

 */
.has-logo-image{
    #mobile-navigation{
      padding:0px;
      min-height:60px;
      box-sizing:border-box;
      #mobile-navigation-title{
          display:none;
      }
      #banner{
        display:inline-block;
        max-height:60px;
      }
    }
  }
  /*------DARKEN THE MOBILE EXPANDED MENU A BIT------*/
  #mobile-navigation ul{
    margin: 0;
    background-color: rgba(0,0,0,.1);
  }
  /*------FIX POSITION AND RESIZE THE COMIC NAVIGATION AT THE BOTTOM OF THE SCREEN------*/
  .comic-nav{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10002;
    width: 100%;
    margin:0px;
    box-sizing: border-box;
    background-color:#ffffff;
    padding:10px 20px;
    -webkit-box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.25);
    box-shadow: 0px -1px 5px 0px rgba(0,0,0,0.25);
  
  }
  .comic-nav-btn, .comic-nav-btn:link, .comic-nav-btn:visited{
    width:100% !important;
  }
  .comic-nav .button-block i{
    line-height:24px;
    font-size:24px;
    padding-top:3px;
  }
  body.hide-icons .comic-nav .button-block i{
    display:inline-block;
  }
  .comic-nav-btn .button-text{
    display:none;
  }
  /*------ADD AN OFFSET TO THE FOOTER SO THE COMIC NAVIGATION DOESN'T COVER UP CONTENT------*/
  .has-comic-nav #canvas{
    padding-bottom: 66px !important;
  }

  /*------CENTER ADS IF THEY ARE RIGHT OR LEFT ALIGNED FOR MOBILE------*/
  .responsive-ad.align-right{
    margin:0 auto;
  }
  .responsive-ad.align-left{
    margin:0 auto;
  }
  body.canvas-setting-site-width #canvas {
      padding-left: 17px;
      padding-right: 17px;
  }
}
  /*------SMALLER THAN IPAD IN LANDSCAPE ORIENTATION------*/
@media screen and (orientation:landscape) and (max-width: 767px)  {

  /*------YOUR CUSTOM MOBILE LANDSCAPE CSS STYLES------*/

  /*------END CUSTOM MOBILE LANDSCAPE CSS STYLES------*/

  /*------FIX POSITION AND RESIZE THE COMIC NAVIGATION ON THE LEFT SIDE OF THE SCREEN------*/
  .comic-nav{
    top:0;
    right:auto;
    left:0;
    width:66px;
    padding:5px 10px;
  }

  .comic-nav-btn, .comic-nav-btn:link, .comic-nav-btn:visited{
    padding:5px 10px !important;
  }
  .comic-nav .sqs-block-button{
    width:100% !important;
    margin:3px 0px;
  }
  /*------ADD AN OFFSET TO THE PAGE BODY SO THE COMIC NAVIGATION DOESN'T COVER UP CONTENT------*/
  .has-comic-nav{
    padding-bottom: 0px !important;
    padding-left:66px !important;
  }
 }
~~~~
### Responsive Ad Code:

~~~~
<div class="section-ad-wrapper">
	<div class="responsive-ad" data-width="YOUR_AD_WIDTH" data-height="YOUR_AD_HEIGHT">
		YOUR_AD_CODE_GOES_HERE
	</div>
</div>
~~~~
### UPDATE:

As I find new things to fix, I will be updating this post and posting a change log in the comments.