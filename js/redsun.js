(function(window){'use strict';function classReg(className){return new RegExp("(^|\\s+)"+className+"(\\s+|$)")}var hasClass,addClass,removeClass;if('classList'in document.documentElement){hasClass=function(elem,c){return elem.classList.contains(c)};addClass=function(elem,c){elem.classList.add(c)};removeClass=function(elem,c){elem.classList.remove(c)}}else{hasClass=function(elem,c){return classReg(c).test(elem.className)};addClass=function(elem,c){if(!hasClass(elem,c)){elem.className=elem.className+' '+c}};removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c),' ')}}function toggleClass(elem,c){var fn=hasClass(elem,c)?removeClass:addClass;fn(elem,c)}var classie={hasClass:hasClass,addClass:addClass,removeClass:removeClass,toggleClass:toggleClass,has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};if(typeof define==='function'&&define.amd){define(classie)}else{window.classie=classie}})(window);jQuery.each(jQuery('textarea[data-autoresize]'),function(){var offset=this.offsetHeight-this.clientHeight;var resizeTextarea=function(el){jQuery(el).css('height','auto').css('height',el.scrollHeight+offset)};jQuery(this).on('keyup input',function(){resizeTextarea(this)}).removeAttr('data-autoresize')});var baguetteBox=(function(){var leftArrow='<svg width="44" height="60">'+'<polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"'+'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>'+'</svg>',rightArrow='<svg width="44" height="60">'+'<polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"'+'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>'+'</svg>',closeX='<svg width="30" height="30">'+'<g stroke="rgb(160, 160, 160)" stroke-width="4">'+'<line x1="5" y1="5" x2="25" y2="25"/>'+'<line x1="5" y1="25" x2="25" y2="5"/>'+'</g></svg>';var options={},defaults={captions:true,buttons:'auto',async:false,preload:2,animation:'slideIn',afterShow:null,afterHide:null,onChange:null};var supports={};var overlay,slider,previousButton,nextButton,closeButton;var currentIndex=0,currentGallery=-1;var touchStartX;var touchFlag=false;var regex=/.+\.(gif|jpe?g|png|webp)/i;var galleries=[];var imagesMap=[];var imagesElements=[];if(![].forEach){Array.prototype.forEach=function(callback,thisArg){for(var i=0;i<this.length;i++)callback.call(thisArg,this[i],i,this)}}if(![].filter){Array.prototype.filter=function(a,b,c,d,e){c=this;d=[];for(e=0;e<c.length;e++)a.call(b,c[e],e,c)&&d.push(c[e]);return d}}function run(selector,userOptions){supports.transforms=testTransformsSupport();supports.svg=testSVGSupport();buildOverlay();galleries=document.querySelectorAll(selector);[].forEach.call(galleries,function(galleryElement,galleryIndex){if(userOptions&&userOptions.filter)regex=userOptions.filter;var tags=galleryElement.getElementsByTagName('a');tags=[].filter.call(tags,function(element){return regex.test(element.href)});var galleryID=imagesMap.length;imagesMap.push(tags);imagesMap[galleryID].options=userOptions;[].forEach.call(imagesMap[galleryID],function(imageElement,imageIndex){bind(imageElement,'click',function(event){event.preventDefault?event.preventDefault():event.returnValue=false;prepareOverlay(galleryID);showOverlay(imageIndex)})})})}function buildOverlay(){overlay=getByID('redson-lbox');if(overlay){slider=getByID('baguetteBox-slider');previousButton=getByID('previous-button');nextButton=getByID('next-button');closeButton=getByID('close-button');return}overlay=create('div');overlay.id='redson-lbox';document.getElementsByTagName('body')[0].appendChild(overlay);slider=create('div');slider.id='baguetteBox-slider';overlay.appendChild(slider);previousButton=create('button');previousButton.id='previous-button';previousButton.innerHTML=supports.svg?leftArrow:'&lt;';overlay.appendChild(previousButton);nextButton=create('button');nextButton.id='next-button';nextButton.innerHTML=supports.svg?rightArrow:'&gt;';overlay.appendChild(nextButton);closeButton=create('button');closeButton.id='close-button';closeButton.innerHTML=supports.svg?closeX:'X';overlay.appendChild(closeButton);previousButton.className=nextButton.className=closeButton.className='baguetteBox-button';bindEvents()}function bindEvents(){bind(overlay,'click',function(event){if(event.target&&event.target.nodeName!=='IMG'&&event.target.nodeName!=='FIGCAPTION')hideOverlay()});bind(previousButton,'click',function(event){event.stopPropagation?event.stopPropagation():event.cancelBubble=true;showPreviousImage()});bind(nextButton,'click',function(event){event.stopPropagation?event.stopPropagation():event.cancelBubble=true;showNextImage()});bind(closeButton,'click',function(event){event.stopPropagation?event.stopPropagation():event.cancelBubble=true;hideOverlay()});bind(overlay,'touchstart',function(event){touchStartX=event.changedTouches[0].pageX});bind(overlay,'touchmove',function(event){if(touchFlag)return;event.preventDefault?event.preventDefault():event.returnValue=false;touch=event.touches[0]||event.changedTouches[0];if(touch.pageX-touchStartX>40){touchFlag=true;showPreviousImage()}else if(touch.pageX-touchStartX<-40){touchFlag=true;showNextImage()}});bind(overlay,'touchend',function(event){touchFlag=false});bind(document,'keydown',function(event){switch(event.keyCode){case 37:showPreviousImage();break;case 39:showNextImage();break;case 27:hideOverlay();break}})}function prepareOverlay(galleryIndex){if(currentGallery===galleryIndex)return;currentGallery=galleryIndex;setOptions(imagesMap[galleryIndex].options);while(slider.firstChild)slider.removeChild(slider.firstChild);imagesElements.length=0;for(var i=0,fullImage;i<imagesMap[galleryIndex].length;i++){fullImage=create('div');fullImage.className='full-image';fullImage.id='baguette-img-'+i;imagesElements.push(fullImage);slider.appendChild(imagesElements[i])}}function setOptions(newOptions){if(!newOptions)newOptions={};for(var item in defaults){options[item]=defaults[item];if(typeof newOptions[item]!=='undefined')options[item]=newOptions[item]}slider.style.transition=slider.style.webkitTransition=(options.animation==='fadeIn'?'opacity .4s ease':options.animation==='slideIn'?'':'none');if(options.buttons==='auto'&&('ontouchstart'in window||imagesMap[currentGallery].length===1))options.buttons=false;previousButton.style.display=nextButton.style.display=(options.buttons?'':'none')}function showOverlay(index){if(overlay.style.display==='block')return;currentIndex=index;loadImage(currentIndex,function(){preloadNext(currentIndex);preloadPrev(currentIndex)});updateOffset();overlay.style.display='block';setTimeout(function(){overlay.className='visible';if(options.afterShow)options.afterShow()},50);if(options.onChange)options.onChange(currentIndex,imagesElements.length)}function hideOverlay(){if(overlay.style.display==='none')return;overlay.className='';setTimeout(function(){overlay.style.display='none';if(options.afterHide)options.afterHide()},500)}function loadImage(index,callback){var imageContainer=imagesElements[index];if(typeof imageContainer==='undefined')return;if(imageContainer.getElementsByTagName('img')[0]){if(callback)callback();return}imageElement=imagesMap[currentGallery][index];imageCaption=(typeof(options.captions)==='function')?options.captions.call(imagesMap[currentGallery],imageElement):imageElement.getAttribute('data-caption')||imageElement.title;imageSrc=getImageSrc(imageElement);var figure=create('figure');var image=create('img');var figcaption=create('figcaption');imageContainer.appendChild(figure);figure.innerHTML='<div class="spinner">'+'<div class="double-bounce1"></div>'+'<div class="double-bounce2"></div>'+'</div>';image.onload=function(){var spinner=document.querySelector('#baguette-img-'+index+' .spinner');figure.removeChild(spinner);if(!options.async&&callback)callback()};image.setAttribute('src',imageSrc);figure.appendChild(image);if(options.captions&&imageCaption){figcaption.innerHTML=imageCaption;figure.appendChild(figcaption)}if(options.async&&callback)callback()}function getImageSrc(image){var result=imageElement.href;if(image.dataset){var srcs=[];for(var item in image.dataset){if(item.substring(0,3)==='at-'&&!isNaN(item.substring(3)))srcs[item.replace('at-','')]=image.dataset[item]}keys=Object.keys(srcs).sort(function(a,b){return parseInt(a)<parseInt(b)?-1:1});var width=window.innerWidth*window.devicePixelRatio;var i=0;while(i<keys.length-1&&keys[i]<width)i++;result=srcs[keys[i]]||result}return result}function showNextImage(){var returnValue;if(currentIndex<=imagesElements.length-2){currentIndex++;updateOffset();preloadNext(currentIndex);returnValue=true}else if(options.animation){slider.className='bounce-from-right';setTimeout(function(){slider.className=''},400);returnValue=false}if(options.onChange)options.onChange(currentIndex,imagesElements.length);return returnValue}function showPreviousImage(){var returnValue;if(currentIndex>=1){currentIndex--;updateOffset();preloadPrev(currentIndex);returnValue=true}else if(options.animation){slider.className='bounce-from-left';setTimeout(function(){slider.className=''},400);returnValue=false}if(options.onChange)options.onChange(currentIndex,imagesElements.length);return returnValue}function updateOffset(){var offset=-currentIndex*100+'%';if(options.animation==='fadeIn'){slider.style.opacity=0;setTimeout(function(){supports.transforms?slider.style.transform=slider.style.webkitTransform='translate3d('+offset+',0,0)':slider.style.left=offset;slider.style.opacity=1},400)}else{supports.transforms?slider.style.transform=slider.style.webkitTransform='translate3d('+offset+',0,0)':slider.style.left=offset}}function testTransformsSupport(){var div=create('div');return typeof div.style.perspective!=='undefined'||typeof div.style.webkitPerspective!=='undefined'}function testSVGSupport(){var div=create('div');div.innerHTML='<svg/>';return(div.firstChild&&div.firstChild.namespaceURI)=='http://www.w3.org/2000/svg'}function preloadNext(index){if(index-currentIndex>=options.preload)return;loadImage(index+1,function(){preloadNext(index+1)})}function preloadPrev(index){if(currentIndex-index>=options.preload)return;loadImage(index-1,function(){preloadPrev(index-1)})}function bind(element,event,callback){if(element.addEventListener)element.addEventListener(event,callback,false);else element.attachEvent('on'+event,callback)}function getByID(id){return document.getElementById(id)}function create(element){return document.createElement(element)}return{run:run,showNext:showNextImage,showPrevious:showPreviousImage}})();var hljs=new function(){function j(v){return v.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(v){return v.nodeName.toLowerCase()}function h(w,x){var v=w&&w.exec(x);return v&&v.index==0}function r(w){var v=(w.className+" "+(w.parentNode?w.parentNode.className:"")).split(/\s+/);v=v.map(function(x){return x.replace(/^lang(uage)?-/,"")});return v.filter(function(x){return i(x)||x=="no-highlight"})[0]}function o(x,y){var v={};for(var w in x){v[w]=x[w]}if(y){for(var w in y){v[w]=y[w]}}return v}function u(x){var v=[];(function w(y,z){for(var A=y.firstChild;A;A=A.nextSibling){if(A.nodeType==3){z+=A.nodeValue.length}else{if(t(A)=="br"){z+=1}else{if(A.nodeType==1){v.push({event:"start",offset:z,node:A});z=w(A,z);v.push({event:"stop",offset:z,node:A})}}}}return z})(x,0);return v}function q(w,y,C){var x=0;var F="";var z=[];function B(){if(!w.length||!y.length){return w.length?w:y}if(w[0].offset!=y[0].offset){return(w[0].offset<y[0].offset)?w:y}return y[0].event=="start"?w:y}function A(H){function G(I){return" "+I.nodeName+'="'+j(I.value)+'"'}F+="<"+t(H)+Array.prototype.map.call(H.attributes,G).join("")+">"}function E(G){F+="</"+t(G)+">"}function v(G){(G.event=="start"?A:E)(G.node)}while(w.length||y.length){var D=B();F+=j(C.substr(x,D[0].offset-x));x=D[0].offset;if(D==w){z.reverse().forEach(E);do{v(D.splice(0,1)[0]);D=B()}while(D==w&&D.length&&D[0].offset==x);z.reverse().forEach(A)}else{if(D[0].event=="start"){z.push(D[0].node)}else{z.pop()}v(D.splice(0,1)[0])}}return F+j(C.substr(x))}function m(y){function v(z){return(z&&z.source)||z}function w(A,z){return RegExp(v(A),"m"+(y.cI?"i":"")+(z?"g":""))}function x(D,C){if(D.compiled){return}D.compiled=true;D.k=D.k||D.bK;if(D.k){var z={};var E=function(G,F){if(y.cI){F=F.toLowerCase()}F.split(" ").forEach(function(H){var I=H.split("|");z[I[0]]=[G,I[1]?Number(I[1]):1]})};if(typeof D.k=="string"){E("keyword",D.k)}else{Object.keys(D.k).forEach(function(F){E(F,D.k[F])})}D.k=z}D.lR=w(D.l||/\b[A-Za-z0-9_]+\b/,true);if(C){if(D.bK){D.b="\\b("+D.bK.split(" ").join("|")+")\\b"}if(!D.b){D.b=/\B|\b/}D.bR=w(D.b);if(!D.e&&!D.eW){D.e=/\B|\b/}if(D.e){D.eR=w(D.e)}D.tE=v(D.e)||"";if(D.eW&&C.tE){D.tE+=(D.e?"|":"")+C.tE}}if(D.i){D.iR=w(D.i)}if(D.r===undefined){D.r=1}if(!D.c){D.c=[]}var B=[];D.c.forEach(function(F){if(F.v){F.v.forEach(function(G){B.push(o(F,G))})}else{B.push(F=="self"?D:F)}});D.c=B;D.c.forEach(function(F){x(F,D)});if(D.starts){x(D.starts,C)}var A=D.c.map(function(F){return F.bK?"\\.?("+F.b+")\\.?":F.b}).concat([D.tE,D.i]).map(v).filter(Boolean);D.t=A.length?w(A.join("|"),true):{exec:function(F){return null}};D.continuation={}}x(y)}function c(S,L,J,R){function v(U,V){for(var T=0;T<V.c.length;T++){if(h(V.c[T].bR,U)){return V.c[T]}}}function z(U,T){if(h(U.eR,T)){return U}if(U.eW){return z(U.parent,T)}}function A(T,U){return!J&&h(U.iR,T)}function E(V,T){var U=M.cI?T[0].toLowerCase():T[0];return V.k.hasOwnProperty(U)&&V.k[U]}function w(Z,X,W,V){var T=V?"":b.classPrefix,U='<span class="'+T,Y=W?"":"</span>";U+=Z+'">';return U+X+Y}function N(){if(!I.k){return j(C)}var T="";var W=0;I.lR.lastIndex=0;var U=I.lR.exec(C);while(U){T+=j(C.substr(W,U.index-W));var V=E(I,U);if(V){H+=V[1];T+=w(V[0],j(U[0]))}else{T+=j(U[0])}W=I.lR.lastIndex;U=I.lR.exec(C)}return T+j(C.substr(W))}function F(){if(I.sL&&!f[I.sL]){return j(C)}var T=I.sL?c(I.sL,C,true,I.continuation.top):e(C);if(I.r>0){H+=T.r}if(I.subLanguageMode=="continuous"){I.continuation.top=T.top}return w(T.language,T.value,false,true)}function Q(){return I.sL!==undefined?F():N()}function P(V,U){var T=V.cN?w(V.cN,"",true):"";if(V.rB){D+=T;C=""}else{if(V.eB){D+=j(U)+T;C=""}else{D+=T;C=U}}I=Object.create(V,{parent:{value:I}})}function G(T,X){C+=T;if(X===undefined){D+=Q();return 0}var V=v(X,I);if(V){D+=Q();P(V,X);return V.rB?0:X.length}var W=z(I,X);if(W){var U=I;if(!(U.rE||U.eE)){C+=X}D+=Q();do{if(I.cN){D+="</span>"}H+=I.r;I=I.parent}while(I!=W.parent);if(U.eE){D+=j(X)}C="";if(W.starts){P(W.starts,"")}return U.rE?0:X.length}if(A(X,I)){throw new Error('Illegal lexeme "'+X+'" for mode "'+(I.cN||"<unnamed>")+'"')}C+=X;return X.length||1}var M=i(S);if(!M){throw new Error('Unknown language: "'+S+'"')}m(M);var I=R||M;var D="";for(var K=I;K!=M;K=K.parent){if(K.cN){D+=w(K.cN,D,true)}}var C="";var H=0;try{var B,y,x=0;while(true){I.t.lastIndex=x;B=I.t.exec(L);if(!B){break}y=G(L.substr(x,B.index-x),B[0]);x=B.index+y}G(L.substr(x));for(var K=I;K.parent;K=K.parent){if(K.cN){D+="</span>"}}return{r:H,value:D,language:S,top:I}}catch(O){if(O.message.indexOf("Illegal")!=-1){return{r:0,value:j(L)}}else{throw O}}}function e(y,x){x=x||b.languages||Object.keys(f);var v={r:0,value:j(y)};var w=v;x.forEach(function(z){if(!i(z)){return}var A=c(z,y,false);A.language=z;if(A.r>w.r){w=A}if(A.r>v.r){w=v;v=A}});if(w.language){v.second_best=w}return v}function g(v){if(b.tabReplace){v=v.replace(/^((<[^>]+>|\t)+)/gm,function(w,z,y,x){return z.replace(/\t/g,b.tabReplace)})}if(b.useBR){v=v.replace(/\n/g,"<br>")}return v}function p(z){var y=b.useBR?z.innerHTML.replace(/\n/g,"").replace(/<br>|<br [^>]*>/g,"\n").replace(/<[^>]*>/g,""):z.textContent;var A=r(z);if(A=="no-highlight"){return}var v=A?c(A,y,true):e(y);var w=u(z);if(w.length){var x=document.createElementNS("http://www.w3.org/1999/xhtml","pre");x.innerHTML=v.value;v.value=q(w,u(x),y)}v.value=g(v.value);z.innerHTML=v.value;z.className+=" hljs "+(!A&&v.language||"");z.result={language:v.language,re:v.r};if(v.second_best){z.second_best={language:v.second_best.language,re:v.second_best.r}}}var b={classPrefix:"hljs-",tabReplace:null,useBR:false,languages:undefined};function s(v){b=o(b,v)}function l(){if(l.called){return}l.called=true;var v=document.querySelectorAll("pre code");Array.prototype.forEach.call(v,p)}function a(){addEventListener("DOMContentLoaded",l,false);addEventListener("load",l,false)}var f={};var n={};function d(v,x){var w=f[v]=x(this);if(w.aliases){w.aliases.forEach(function(y){n[y]=v})}}function k(){return Object.keys(f)}function i(v){return f[v]||f[n[v]]}this.highlight=c;this.highlightAuto=e;this.fixMarkup=g;this.highlightBlock=p;this.configure=s;this.initHighlighting=l;this.initHighlightingOnLoad=a;this.registerLanguage=d;this.listLanguages=k;this.getLanguage=i;this.inherit=o;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE]};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE]};this.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};this.CLCM={cN:"comment",b:"//",e:"$",c:[this.PWM]};this.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[this.PWM]};this.HCM={cN:"comment",b:"#",e:"$",c:[this.PWM]};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.CSSNM={cN:"number",b:this.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0};this.RM={cN:"regexp",b:/\//,e:/\/[gim]*/,i:/\n/,c:[this.BE,{b:/\[/,e:/\]/,r:0,c:[this.BE]}]};this.TM={cN:"title",b:this.IR,r:0};this.UTM={cN:"title",b:this.UIR,r:0}}();hljs.registerLanguage("javascript",function(a){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",b:/^\s*('|")use strict('|")/,r:10},a.ASM,a.QSM,a.CLCM,a.CBCM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBCM,a.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:true,c:[a.inherit(a.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[a.CLCM,a.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+a.IR,r:0}]}});hljs.registerLanguage("css",function(a){var b="[a-zA-Z-][a-zA-Z0-9_-]*";var c={cN:"function",b:b+"\\(",rB:true,eE:true,e:"\\("};return{cI:true,i:"[=/|']",c:[a.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:true,eE:true,r:0,c:[c,a.ASM,a.QSM,a.CSSNM]}]},{cN:"tag",b:b,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBCM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[c,a.CSSNM,a.QSM,a.ASM,a.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});hljs.registerLanguage("xml",function(a){var c="[A-Za-z0-9\\._:-]+";var d={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"};var b={eW:true,i:/</,r:0,c:[d,{cN:"attribute",b:c,r:0},{b:"=",r:0,c:[{cN:"value",v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:true,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},d,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ /><]+",r:0},b]}]}});(function(){var bodyEl=document.body,content=document.querySelector('.page-body'),openbtn=document.getElementById('open-button'),closebtn=document.getElementById('close-button'),isOpen=false;function init(){initEvents()}function initEvents(){openbtn.addEventListener('click',toggleMenu);if(closebtn){closebtn.addEventListener('click',toggleMenu)}content.addEventListener('click',function(ev){var target=ev.target;if(isOpen&&target!==openbtn){toggleMenu()}})}function toggleMenu(){if(isOpen){classie.remove(bodyEl,'show-menu')}else{classie.add(bodyEl,'show-menu')}isOpen=!isOpen}init()})();$(function(){var supportCssTransforms=$("html").hasClass("csstransforms3d");if(supportCssTransforms){$("body").addClass("with-translate")}if(navigator.userAgent.indexOf("MSIE 10.")!=-1){$("body").addClass("ie10")}$("#toggle, #menu-close").on("click",function(){$("body, .morepanel").toggleClass("open")})});