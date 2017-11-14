/*! Copyright ? 2015, 2016, Oracle and/or its affiliates. All rights reserved. */
/*! mmapi v1.10 */
/*v1.10.21.2591*/
/*Please do not modify this file except configuration section at the bottom.*/
(function(b,N){function g(a,c){return typeof a===c}function B(a){return g(a,"undefined")}function x(a,c){return Object.prototype.hasOwnProperty.call(a,c)}function C(a,c){return x(a,c)&&g(a[c],"string")}function K(a,c,d){try{g(a,"function")&&a.apply(c,d)}catch(b){O&&O.log(b)}}function e(a,c){for(var d in a)x(a,d)&&c(a[d],d)}function L(a){var c=new Date;c.setTime(c.getTime()+864E5*a);return c}function P(a){this.enableUtility=function(c){var d=a.getParam("un",a.baseStorage.storeStrategy.persistent)||
"";(new RegExp("(^|,)"+c+"($|,)")).test(d)||(d=d.split(","),d.push(c),a.setParam("un",d.join(",").replace(/(^,)|(,$)/g,""),a.baseStorage.storeStrategy.persistent));return this};this.disableUtility=function(c){var d=a.getParam("un",a.baseStorage.storeStrategy.persistent)||"";(new RegExp("(^|,)"+c+"($|,)")).test(d)&&(d=d.replace(new RegExp("(^|,)"+c+"($|,)","gi"),",").replace(/(^,)|(,$)/g,""),a.setParam("un",d,a.baseStorage.storeStrategy.persistent));return this};this.enable=function(){a.enable();return this};
this.disable=function(){a.disable();return this};this.getConfig=function(){return{storageType:a.storageType,cprefix:a.cprefix,domain:a.domain,baseContentUrl:a.baseContentUrl,cookie_domain:a.cookie_domain,srv:a.srv,async:a.async,beforeInit:a.beforeInit,beforeRequest:a.beforeRequest,afterResponse:a.afterResponse,afterResponseExecution:a.afterResponseExecution}}}function I(a){function c(){for(var a=document.cookie.split(/;\s+/g),c={},d=0;d<a.length;d++){var b=a[d].split(/;|=/);1<b.length&&(c[b[0]]=b[1])}return c}
var d=this,b=a.domain,g=a.secure,h=encodeURIComponent,t=decodeURIComponent;d.set=function(a,c,t,e){e||(c=h(c));a=h(a)+"="+c+";domain="+b+";path=/"+(t?";expires="+L(t).toGMTString():"")+(g?";secure":"");document.cookie=a;return d};d.remove=function(a){d.set(a,"",-1);return d};d.removeAll=function(a){if(a){var b=c();e(b,function(c,b){(new RegExp("^"+a)).test(b)&&d.remove(t(b))})}};d.get=function(a,c){var b=new RegExp("(?:^|; )"+h(a).replace(/([.$?*|{}()\[\]\\\/+^])/g,"\\$1")+"=([^;]+)"),b=(document.cookie.match(b)||
[,""])[1];return c?b:t(b)};d.getAll=function(a,b){if(a){var d=c(),h={};e(d,function(c,d){(new RegExp("^"+a)).test(d)&&(h[t(d)]=b?c:t(c))});return h}}}function aa(a){function c(a){a=JSON.parse('{"v":'+a+"}");return"v"in a?a.v:a}if(!/^((cookie-key-value)|(cookie-key-value-secure))$/.test(a.type))throw"(mm module: storage) Invalid storage type: "+a.type;var b="cookie-key-value-secure"===a.type,l=a.cprefix+"."+(a.namespace||"def")+".",g=l.replace(/\./g,"\\."),h=new I({domain:a.domain,secure:b});this.get=
function(a){if(!a){a=h.getAll(g);var b=l.length,d={};e(a,function(a,e){d[e.substring(b)]=c(a)});return d}return(a=h.get(l+a))?c(a):a};this.set=function(a,b,c){null===b||B(b)||(b=JSON.stringify({v:b}),b=b.substring(5,b.length-1),h.set(l+a,b,B(c)?365:c));return this};this.removeAll=function(){h.removeAll(g);return this};this.testStorage=function(){var a=(""+Math.random()).substring(0,5);h.set(l+"tst",a,10);a=h.get(l+"tst",!0)===a?1:0;h.remove(l+"tst");return a}}function ba(a){function b(a,c){var d=
{};e(a,function(a,b){d[b]=a});e(c,function(a,b){d[b]=a});return d}function d(a){for(var b={},c="",d=0,e;e=z.get(a+d++,!0);)c+=e;c=decodeURIComponent(c);try{b=JSON.parse(c)}catch(f){}return b}function l(){r=d(J);u=d(C);x();r[q]=r[q]||{};u[q]=u[q]||{}}function g(a,b,c){b=JSON.stringify(b);var d="{}"===b,e=0;for(b=encodeURIComponent(b);z.get(a+e,!0);)z.remove(a+e++);if(!d)for(e=0;d=b.substr(3E3*e,3E3);)z.set(a+e++,d,B(c)?365:c,!0)}function h(){g(J,r);g(C,u,0)}function t(a){var b={};e(a,function(a,c){b[c]=
E(a).v});return b}function x(){var a=(new Date).getTime(),b=r[q];e(b,function(c,d){E(c).e<=a&&delete b[d]});h()}function E(a){var b=a.indexOf("|");return{v:JSON.parse(a.substring(b+1,a.length)),e:a.substring(0,b)}}if(!/^((cookie)|(cookie-secure))$/.test(a.type))throw"(mm module: storage) Invalid storage type: "+a.type;var r,u,y=a.cprefix+".",J=y+"store.p.",C=y+"store.s.",z=new I({domain:a.domain,secure:"cookie-secure"===a.type}),q=a.namespace||"def";this.get=function(a){l();var d=b(r[q],u[q]);return a?
d[a]?E(d[a]).v:d[a]:t(d)};this.set=function(a,b,c){l();var d=r[q],e=u[q];delete d[a];delete e[a];null===b||B(b)||(c?(b=L(c).getTime()+"|"+JSON.stringify(b),d[a]=b):e[a]="0|"+JSON.stringify(b));h();return this};this.removeAll=function(){l();r[q]={};u[q]={};h();return this};this.testStorage=function(){var a=(""+Math.random()).substring(0,5);z.set(y+"tst",a,10);a=z.get(y+"tst",!0)===a?1:0;z.remove(y+"tst");return a};this.exportData=function(){l();var a={};e(r,function(b,c){a[c]=b});e(u,function(d,e){a[e]=
b(a[e],d)});e(a,function(b,c){e(b,function(b,d){a[c][d]=E(b)})});return a};l()}function R(a){function c(a,b){if(A[a])for(var w=A[a].length-1;0<=w;w--)A[a][w].call({},b)}function d(a){F=g(a,"boolean")?a:!1}function l(a,b,w){w=w||{};w.type="text/javascript";w.id=a;w.src=b;if(F){a=document.getElementsByTagName("head")[0];var v=document.createElement("script");e(w,function(a,n){v.setAttribute(n,a)});a.insertBefore(v,a.lastChild)}else{var c="";e(w,function(a,n){c+=" "+n+'="'+a+'"'});document.write("<script"+
c+">\x3c/script>")}}function L(a){if(!g(a,"object"))return a;if(a.constructor===Array)return a.join(";");var b=[];e(a,function(a,n){a.constructor===Array?e(a,function(a){b.push(n+"="+a)}):b.push(n+"="+encodeURIComponent(a))});return b.join(";")}function h(a){a=a?J(a):{};var b={};g(a["mm-dlp-api"],"string")&&(b.fv={ref:a["original-ref"].substring(0,256),url:a["original-url"].substring(0,1024)},b.origin=/http(s)?:\/\/.*?([^/]|$)+/.exec(b.fv.url)[0]);e(a,function(a,n){"mmcore."===n.substring(0,7)&&(b[n.substring(7)]=
a)});return b}function t(){var n="mmRequestCallbacks["+H+"]",m={},c=b.screen;m.fv={dmn:a.domain,ref:document.referrer.substring(0,256),url:location.href.substring(0,1024),scrw:c.width,scrh:c.height,clrd:c.colorDepth,cok:p[k.persistent].testStorage()};m.lver="1.10";m.jsncl=n;m.ri=H;m.lto=-(new Date).getTimezoneOffset();return m}function P(n,m){var c=n&&n.Packages||[],v=c.length;if(0<v){b.mmInitCallback=function(a){a(f,n,{skipResponseProcessing:!0,skipPersistentData:!0,useLoaderStorage:!0,debug:da});
0===--v&&(m(),b.mmInitCallback=N)};for(var d=0;d<c.length;d++)l("mmpack."+d,0===c[d].indexOf("//")?c[d]:a.baseContentUrl+c[d])}else m()}function E(a){(a=document.getElementById(a))&&a.parentNode?a.parentNode.removeChild(a):a&&a.removeAttribute("src")}function r(a,m,d){a=(Y[a-1]=m)&&m.PersistData||[];for(var v=a.length;v--;)f.setParam(a[v].Name,a[v].Value,k.persistent,a[v].Expiration);if(C(m,"mmcoreResponse")&&x(b,"mmcore"))try{Function(m.mmcoreResponse).call(b)}catch(G){O.log(G)}c("response",m);d(!!m);
c("responseExecuted",m)}function u(a,c){var d="mmrequest."+H;(function(a,n){b.mmRequestCallbacks[a]=function(c){E(d);1===a?P(c,function(){r(a,c,n);F=!0;var d=h(document.location.search).origin;d&&b.parent&&b.parent.postMessage&&b.parent.postMessage(JSON.stringify({hash:"unhide",command:"unhide",data:{}}),d)}):r(a,c,n);delete b.mmRequestCallbacks[a]}})(H,c);l(d,a,{onerror:"window['mmRequestCallbacks']["+H+"](false);"});H++}function y(){var a={};return{get:function(b){return b?a[b]:a},set:function(b,
c,d){0>parseInt(d)?delete a[b]:a[b]=c},removeAll:function(){a={}}}}function J(a){a=a.split(/\?|&/);for(var b={},c,d,G=0;G<a.length;G++)if(a[G]){c=a[G].split("=");try{d=decodeURIComponent(c[1]||"")}catch(e){d=c[1]||""}b[c[0]]=d}return b}function R(a){function b(a,n,m){var e,f;if(e=d[a]){c[a]=n;e=e.split(/;/);for(var h=0;h<e.length;h++)f=e[h].split("="),(a=f[0].replace(/^\s+|\s+$/gm,""))&&m(n,a,f[1]||"")}}var c={},d=J(a);M||(c.pageid=d.pageid);c.jsver=d.jsver;b("uv",{},function(a,b,c){x(a,b)||(a[b]=
[]);a[b].push(c)});b("uat",{},function(a,b,c){a[b]=decodeURIComponent(c)});b("ids",{},function(a,b,c){c&&(a[b]=decodeURIComponent(c))});b("rul",[],function(a,b,c){a.push(b)});return c}function z(){if(x(b,"mmcore")){var c=b.mmcore;c.server=a.srv;f.CGRequestInternal=f.CGRequest;f.CGRequest=function(a,b){M=!0;S=a;T=b;c.CGRequest()};var d=c._Tag;c._Tag=function(b){if(-1==b.indexOf(a.srv))d.apply(c,arguments);else{c._Clear.call(c);var e=f.mergeParams(T,R(b));Z=F;M||(F=c._async);f.CGRequestInternal(S,e);
F=Z;T=S=N;M=!1}};var e=c.SetCookie;c.SetCookie=function(a){/^(mmid|pd|srv)$/.test(a)||e.apply(c,arguments)}}}function q(a){return a||b.location.hostname.replace(/^www\./i,"")}function Q(a,b,c){var d="";0<b.length&&"."!=b.substring(b.length-1)&&(d=".");b=b+d+c;d=a.get(b);g(d,"string")&&d&&(f.setParam(c,d,k.persistent,365),a.remove(b))}function W(a){var c;c=x(b,"mmcore")&&b.mmcore.cookie_domain?b.mmcore.cookie_domain:C(a,"mmcoreCookieDomain")?a.mmcoreCookieDomain:a.cookie_domain;a=x(b,"mmcore")&&b.mmcore.cprefix?
b.mmcore.cprefix:C(a,"mmcoreCprefix")?a.mmcoreCprefix:a.cprefix+".";c=new I({domain:q(c)});Q(c,a,"pd");Q(c,a,"srv");Q(c,"","mmid")}function V(a){var b=f.getParam,c=function(a,b,c,d){f.setParam(a,b,B(c)?1:c,d)};K(a.beforeInit,{},[b,c,{getParam:b,setParam:c,disable:function(){D[k.page].set("disabled",1)},setAsync:d}]);X()||(f.on("request",function(){K(a.beforeRequest,{},[b,c])}),f.on("response",function(d){K(a.afterResponse,{},[b,c,d])}),f.on("responseExecuted",function(d){K(a.afterResponseExecution,
{},[b,c,d])}))}function ca(a){b.mmcoreInitCallback=function(c){W(a);z();f.CGRequest(function(){g(c,"function")&&c.apply(b.mmcore,arguments)},{});delete b.mmcoreInitCallback};"local"!==a.mmcoreUrl&&l("mmcoreIntegration",a.mmcoreUrl)}function X(){return 1==D[k.persistent].get("disabled")||1==D[k.page].get("disabled")}this.version="1.10";var f=this,Y=[],H=1,F=!1,A={},da={},p=[],D=[],k={persistent:0,deferredRequest:1,request:2,page:3},S,T,Z,M=!1,U=null!==a.storageType.match(/.*-secure$/);this.baseStorage=
function(){var b=q(a.cookie_domain),c=a.cprefix+"\\.store\\.p\\.",d=a.cprefix+"\\.store\\.s\\.",f=function(c){return function(d){var e={p:"mmparams.p",d:"mmparams.d",e:"mmengine"};return new ba({type:c,namespace:e[d]?e[d]:d,domain:b,cprefix:a.cprefix})}},h=function(c){return function(d){var e={"mmparams.p":"p","mmparams.d":"d",mmengine:"e"};return new aa({type:c,namespace:e[d]?e[d]:d,domain:b,cprefix:a.cprefix})}};if(a.storageType.match(/cookie-key-value($|-secure$)/)){var k=f("cookie"),g=h(a.storageType),
f=k().exportData(),l=!1;e(f,function(a,b){var c=g(b);e(a,function(a,b){l=!0;var d;d=a.e;d=(d=parseInt(d))?Math.round(Math.abs(((new Date).getTime()-d)/864E5)):d;c.set(b,a.v,0<=d?d:30)})});l&&(f=new I({domain:b,secure:U}),f.removeAll(c),f.removeAll(d));return g}var k=f(a.storageType),g=h("cookie-key-value"),f=new I({domain:b,secure:U}),f=f.getAll(a.cprefix+"\\.",!0),p={};e(f,function(a,b){var c=b.split(/\./);if(2<c.length&&"store"!=c[1]){var d=p[c[1]];d||(d=g(c[1]),p[c[1]]=d);var e=k(c[1]),c=b.substring((c[0]+
"."+c[1]+".").length);a=d.get(c);e.set(c,a,30)}});e(p,function(a){a.removeAll()});return k}();this.baseStorage.storeStrategy=k;this.baseStorage.isSecure=U;this.mergeParams=function(a,b){a=B(a)?{}:a;b=B(b)?{}:b;if(!g(b,"object"))return b;var c={};g(a,"object")&&e(a,function(a,b){c[b]=a});e(b,function(a,d){c[d]=c[d]?c[d].constructor===Array&&b[d].constructor===Array?c[d].concat(a):f.mergeParams(c[d],a):a});return c};this.CGRequest=function(d,m){d=d||function(){};m=m||{};b.mmRequestCallbacks=b.mmRequestCallbacks||
{};c("request");var g=f.mergeParams(t(),f.mergeParams(f.mergeParams(p[k.persistent].get(),f.mergeParams(p[k.deferredRequest].get(),f.mergeParams(p[k.page].get(),p[k.request].get()))),h(location.search))),l=[],q=a.srv,g=f.mergeParams(g,m);e(g,function(a,b){l.push(encodeURIComponent(b)+"="+encodeURIComponent(L(a)))});p[k.deferredRequest].removeAll();p[k.request].removeAll();u(q+l.join("&"),d);return this};this.getResponses=function(){return Y};this.setParam=function(a,b,c,d){p[c].set(a,b,d);return this};
this.getParam=function(a,b){return p[b].get(a)};this.removeParam=function(a,b){p[b].set(a,"",-1);return this};this.on=function(a,b){A[a]&&A[a].push(b);return f};this.disable=function(){D[k.persistent].set("disabled",1,0);return this};this.enable=function(){D[k.persistent].set("disabled",null,-1);return this};(function(a){function c(){V(a);X()||(C(a,"mmcoreUrl")&&a.mmcoreUrl?ca(a):(W(a),f.CGRequest(N,{})))}e(a,function(a,b){f[b]=a});var g=h(document.location.search);if(1!=g.disabled){f.calcCookieDomain=
q(f.cookie_domain);d(a.async);D[k.persistent]=f.baseStorage("ls");D[k.page]=y();p[k.persistent]=f.baseStorage("p");p[k.deferredRequest]=f.baseStorage("d");p[k.request]=y();p[k.page]=y();A.request=[];A.response=[];A.responseExecuted=[];var v=h(document.referrer).pruh,g=g.pruh,r=b.mmpruh,t=f.getParam("pruh",0),u=(v?v+",":"")+(g?g+",":"")+(r?r+",":"")+(t?t:"");u?(b.mmInitCallback=function(a){a(f,u,c)},l("MM.PRUH",a.baseContentUrl+"utils/pruh.js")):c()}})(a);return this}if(!b.mmsystem){var O=b.console||
{log:function(){},error:function(){}},V=new R({
 storageType:'cookie',
 cprefix:'mmapi',
 domain:'new_betfair.com',
 baseContentUrl:'//service.maxymiser.net/platform/eu/api/',
 cookie_domain:location.hostname.match(/^[\d.]+$|/)[0]||('.'+(location.hostname.match(/[^.]+\.((eu|us|uk|cn)\.com|\w{2,3}\.\w{2}|\w{2,})$/)||[location.hostname])[0]),
 srv:'//service.maxymiser.net/cg/v5/?',
 async:false,
 mmcoreUrl:'',
 mmcoreCookieDomain:'',
 mmcoreCprefix:'',
 beforeInit: function( getParam, setParam ) {
  /* Cross-domain data restore from window.name */
  function restoreVisitorIdFromWindow() {
    var key, crossDomainData;

    if (window.JSON && window.JSON.stringify && window.JSON.parse) {
      window.name = window.name.replace(/\|\*mm(.*)mm\*\|/, function(matchedString, capturedData) {
        crossDomainData = JSON.parse(capturedData);
        for (key in crossDomainData) {
          if (crossDomainData.hasOwnProperty(key)) {
            setParam(key, crossDomainData[key], 0);
          }
        }
        return '';
      });
    }
  }

  restoreVisitorIdFromWindow();
 },
 beforeRequest:function( getParam, setParam ){   },
 afterResponse: function( getParam, setParam, genInfo ) {
  /* Cross-domain data capture to window.name */
  function captureVisitorIdToWindow(crossDomainParams) {
    var i, cgParamName, cgParamValue,
      crossDomainData = {},
      hasCrossDomainParams = false;

    if (window.JSON && window.JSON.stringify && window.JSON.parse) {
      for (i = crossDomainParams.length; i--;) {
        cgParamName = crossDomainParams[i];
        cgParamValue = getParam(cgParamName, 0);

        if (typeof cgParamValue === 'undefined' || cgParamValue === 'undefined') {
          // nothing to save
        } else {
          hasCrossDomainParams = true;
          crossDomainData[cgParamName] = cgParamValue;
        }
      }

      if (hasCrossDomainParams) {
        window.name = window.name.replace(/\|\*mm(.*)mm\*\|/, '') + ('|*mm' + JSON.stringify(crossDomainData) + 'mm*|');
      }
    }
  }

  captureVisitorIdToWindow(['pd', 'mmid', 'srv']);
 },
 afterResponseExecution:function( getParam, setParam, genInfo ){   }
});b.mmsystem=new P(V)}})(window);