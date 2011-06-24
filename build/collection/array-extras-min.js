/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("array-extras",function(d){var b=d.Lang,c=Array.prototype,a=d.Array;a.lastIndexOf=c.lastIndexOf?function(e,g,f){return f||f===0?e.lastIndexOf(g,f):e.lastIndexOf(g);}:function(f,j,h){var e=f.length,g=e-1;if(h||h===0){g=Math.min(h<0?e+h:h,e);}if(g>-1&&e>0){for(;g>-1;--g){if(f[g]===j){return g;}}}return -1;};a.unique=function(f,l){var k=0,e=f.length,h=[],m,g;for(;k<e;++k){m=f[k];for(g=h.length;g>-1;--g){if(m===h[g]){break;}}if(g===-1){h.push(m);}}if(l){if(b.isNumber(h[0])){h.sort(a.numericSort);}else{h.sort();}}return h;};a.filter=c.filter?function(e,g,h){return e.filter(g,h);}:function(g,l,m){var j=0,e=g.length,h=[],k;for(;j<e;++j){if(j in g){k=g[j];if(l.call(m,k,j,g)){h.push(k);}}}return h;};a.reject=function(e,g,h){return a.filter(e,function(k,j,f){return !g.call(h,k,j,f);});};a.every=c.every?function(e,g,h){return e.every(g,h);}:function(g,j,k){for(var h=0,e=g.length;h<e;++h){if(h in g&&!j.call(k,g[h],h,g)){return false;}}return true;};a.map=c.map?function(e,g,h){return e.map(g,h);}:function(g,k,l){var j=0,e=g.length,h=g.concat();for(;j<e;++j){if(j in g){h[j]=k.call(l,g[j],j,g);}}return h;};a.reduce=c.reduce?function(e,i,g,h){return e.reduce(function(l,k,j,f){return g.call(h,l,k,j,f);},i);}:function(h,m,k,l){var j=0,g=h.length,e=m;for(;j<g;++j){if(j in h){e=k.call(l,e,h[j],j,h);}}return e;};a.find=function(g,j,k){for(var h=0,e=g.length;h<e;h++){if(h in g&&j.call(k,g[h],h,g)){return g[h];}}return null;};a.grep=function(e,f){return a.filter(e,function(h,g){return f.test(h);});};a.partition=function(e,h,i){var g={matches:[],rejects:[]};a.each(e,function(j,f){var k=h.call(i,j,f,e)?g.matches:g.rejects;k.push(j);});return g;};a.zip=function(f,e){var g=[];a.each(f,function(i,h){g.push([i,e[h]]);});return g;};},"3.4.0");