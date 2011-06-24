/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("event-key",function(h){var f="+alt",d="+ctrl",e="+meta",c="+shift",b=h.Lang.isString,a=h.Lang.trim,g={KEY_MAP:{enter:13,esc:27,backspace:8,tab:9,pageup:33,pagedown:34},_typeRE:/^(up|down|press):/,processArgs:function(n){var q=n.splice(3,1)[0],p=h.Array.hash(q.match(/\+(?:alt|ctrl|meta|shift)\b/g)||[]),k={type:this._typeRE.test(q)?RegExp.$1:null,keys:null},o=q.replace(/^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,"").split(/,/),l,r,j,m;q=q.replace(this._typeRE,"");if(o.length){k.keys={};for(m=o.length-1;m>=0;--m){l=a(o[m]);if(+l==l){k.keys[l]=p;}else{j=l.toLowerCase();if(this.KEY_MAP[j]){k.keys[this.KEY_MAP[j]]=p;if(!k.type){k.type="down";}}else{r=l.charAt(0).toUpperCase();j=j.charAt(0);k.keys[r.charCodeAt(0)]=(j!==r&&l===r)?h.merge(p,{"+shift":true}):p;}}}}if(!k.type){k.type="press";}return k;},on:function(o,l,n,k){var i=l._extra,j="key"+i.type,m=i.keys,p=(k)?"delegate":"on";if(m){l._detach=o[p](j,function(r){var q=m[r.keyCode];if(q&&(!q[f]||(q[f]&&r.altKey))&&(!q[d]||(q[d]&&r.ctrlKey))&&(!q[e]||(q[e]&&r.metaKey))&&(!q[c]||(q[c]&&r.shiftKey))){n.fire(r);}},k);}else{l._detach=o[p](j,h.bind(n.fire,n),k);}},detach:function(k,i,j){i._detach.detach();}};g.delegate=g.on;g.detachDelegate=g.detach;h.Event.define("key",g,true);},"3.4.0",{requires:["event-synthetic"]});