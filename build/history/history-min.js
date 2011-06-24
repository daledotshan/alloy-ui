/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("history-base",function(b){var i=b.Lang,e=b.Object,l=YUI.namespace("Env.History"),m=b.Array,n=b.config.doc,f=n.documentMode,j=b.config.win,c={merge:true},h="change",a="add",g="replace";function d(){this._init.apply(this,arguments);}b.augment(d,b.EventTarget,null,null,{emitFacade:true,prefix:"history",preventable:false,queueable:true});if(!l._state){l._state={};}function k(o){return i.type(o)==="object";}d.NAME="historyBase";d.SRC_ADD=a;d.SRC_REPLACE=g;d.html5=!!(j.history&&j.history.pushState&&j.history.replaceState&&("onpopstate" in j||b.UA.gecko>=2));d.nativeHashChange=("onhashchange" in j||"onhashchange" in n)&&(!f||f>7);b.mix(d.prototype,{_init:function(p){var o;p=this._config=p||{};this.force=!!p.force;o=this._initialState=this._initialState||p.initialState||null;this.publish(h,{broadcast:2,defaultFn:this._defChangeFn});if(o){this.replace(o);}},add:function(){var o=m(arguments,0,true);o.unshift(a);return this._change.apply(this,o);},addValue:function(p,r,o){var q={};q[p]=r;return this._change(a,q,o);},get:function(p){var q=l._state,o=k(q);if(p){return o&&e.owns(q,p)?q[p]:undefined;}else{return o?b.mix({},q,true):q;}},replace:function(){var o=m(arguments,0,true);o.unshift(g);return this._change.apply(this,o);},replaceValue:function(p,r,o){var q={};q[p]=r;return this._change(g,q,o);},_change:function(q,p,o){o=o?b.merge(c,o):c;if(o.merge&&k(p)&&k(l._state)){p=b.merge(l._state,p);}this._resolveChanges(q,p,o);return this;},_fireEvents:function(q,p,o){this.fire(h,{_options:o,changed:p.changed,newVal:p.newState,prevVal:p.prevState,removed:p.removed,src:q});e.each(p.changed,function(s,r){this._fireChangeEvent(q,r,s);},this);e.each(p.removed,function(s,r){this._fireRemoveEvent(q,r,s);},this);},_fireChangeEvent:function(q,o,p){this.fire(o+"Change",{newVal:p.newVal,prevVal:p.prevVal,src:q});},_fireRemoveEvent:function(q,o,p){this.fire(o+"Remove",{prevVal:p,src:q});},_resolveChanges:function(u,s,p){var t={},o,r=l._state,q={};s||(s={});p||(p={});if(k(s)&&k(r)){e.each(s,function(v,w){var x=r[w];if(v!==x){t[w]={newVal:v,prevVal:x};o=true;}},this);e.each(r,function(w,v){if(!e.owns(s,v)||s[v]===null){delete s[v];q[v]=w;o=true;}},this);}else{o=s!==r;}if(o||this.force){this._fireEvents(u,{changed:t,newState:s,prevState:r,removed:q},p);}},_storeState:function(p,o){l._state=o||{};},_defChangeFn:function(o){this._storeState(o.src,o.newVal,o._options);}},true);b.HistoryBase=d;},"3.4.0",{requires:["event-custom-complex"]});YUI.add("history-hash",function(a){var c=a.HistoryBase,f=a.Lang,l=a.Array,j=a.Object,k=YUI.namespace("Env.HistoryHash"),b="hash",e,d,i,h=a.config.win,m=h.location,n=a.config.useHistoryHTML5;function g(){g.superclass.constructor.apply(this,arguments);}a.extend(g,c,{_init:function(o){var p=g.parseHash();o=o||{};this._initialState=o.initialState?a.merge(o.initialState,p):p;a.after("hashchange",a.bind(this._afterHashChange,this),h);g.superclass._init.apply(this,arguments);},_change:function(q,p,o){j.each(p,function(s,r){if(f.isValue(s)){p[r]=s.toString();}});return g.superclass._change.call(this,q,p,o);},_storeState:function(r,q){var p=g.decode,o=g.createHash(q);g.superclass._storeState.apply(this,arguments);if(r!==b&&p(g.getHash())!==p(o)){g[r===c.SRC_REPLACE?"replaceHash":"setHash"](o);}},_afterHashChange:function(o){this._resolveChanges(b,g.parseHash(o.newHash),{});}},{NAME:"historyHash",SRC_HASH:b,hashPrefix:"",_REGEX_HASH:/([^\?#&]+)=([^&]+)/g,createHash:function(q){var o=g.encode,p=[];j.each(q,function(s,r){if(f.isValue(s)){p.push(o(r)+"="+o(s));}});return p.join("&");},decode:function(o){return decodeURIComponent(o.replace(/\+/g," "));},encode:function(o){return encodeURIComponent(o).replace(/%20/g,"+");},getHash:(a.UA.gecko?function(){var p=/#(.*)$/.exec(m.href),q=p&&p[1]||"",o=g.hashPrefix;return o&&q.indexOf(o)===0?q.replace(o,""):q;}:function(){var p=m.hash.substring(1),o=g.hashPrefix;return o&&p.indexOf(o)===0?p.replace(o,""):p;}),getUrl:function(){return m.href;},parseHash:function(r){var o=g.decode,s,v,t,p,q={},u=g.hashPrefix,w;r=f.isValue(r)?r:g.getHash();if(u){w=r.indexOf(u);if(w===0||(w===1&&r.charAt(0)==="#")){r=r.replace(u,"");}}t=r.match(g._REGEX_HASH)||[];for(s=0,v=t.length;s<v;++s){p=t[s].split("=");q[o(p[0])]=o(p[1]);}return q;},replaceHash:function(p){var o=m.href.replace(/#.*$/,"");if(p.charAt(0)==="#"){p=p.substring(1);}m.replace(o+"#"+(g.hashPrefix||"")+p);},setHash:function(o){if(o.charAt(0)==="#"){o=o.substring(1);}m.hash=(g.hashPrefix||"")+o;}});e=k._notifiers;if(!e){e=k._notifiers=[];}a.Event.define("hashchange",{on:function(q,o,p){if(q.compareTo(h)||q.compareTo(a.config.doc.body)){e.push(p);}},detach:function(r,p,q){var o=l.indexOf(e,q);if(o!==-1){e.splice(o,1);}}});d=g.getHash();i=g.getUrl();if(c.nativeHashChange){a.Event.attach("hashchange",function(q){var o=g.getHash(),p=g.getUrl();l.each(e.concat(),function(r){r.fire({_event:q,oldHash:d,oldUrl:i,newHash:o,newUrl:p});});d=o;i=p;},h);}else{if(!k._hashPoll){if(a.UA.webkit&&!a.UA.chrome&&navigator.vendor.indexOf("Apple")!==-1){a.on("unload",function(){},h);}k._hashPoll=a.later(50,null,function(){var p=g.getHash(),o,q;if(d!==p){q=g.getUrl();o={oldHash:d,oldUrl:i,newHash:p,newUrl:q};d=p;i=q;l.each(e.concat(),function(r){r.fire(o);});}},null,true);}}a.HistoryHash=g;if(n===false||(!a.History&&n!==true&&(!c.html5||!a.HistoryHTML5))){a.History=g;}},"3.4.0",{requires:["event-synthetic","history-base","yui-later"]});YUI.add("history-hash-ie",function(g){if(g.UA.ie&&!g.HistoryBase.nativeHashChange){var c=g.Do,d=YUI.namespace("Env.HistoryHash"),b=g.HistoryHash,e=d._iframe,f=g.config.win,a=f.location;b.getIframeHash=function(){if(!e||!e.contentWindow){return"";}var h=b.hashPrefix,i=e.contentWindow.location.hash.substr(1);return h&&i.indexOf(h)===0?i.replace(h,""):i;};b._updateIframe=function(i,h){var j=e&&e.contentWindow&&e.contentWindow.document,k=j&&j.location;if(!j||!k){return;}if(h){k.replace(i.charAt(0)==="#"?i:"#"+i);}else{j.open().close();k.hash=i;}};c.before(b._updateIframe,b,"replaceHash",b,true);
if(!e){g.on("domready",function(){var h=b.getHash();e=d._iframe=g.Node.getDOMNode(g.Node.create('<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>'));g.config.doc.documentElement.appendChild(e);b._updateIframe(h||"#");g.on("hashchange",function(i){h=i.newHash;if(b.getIframeHash()!==h){b._updateIframe(h);}},f);g.later(50,null,function(){var i=b.getIframeHash();if(i!==h){b.setHash(i);}},null,true);});}}},"3.4.0",{requires:["history-hash","node-base"]});YUI.add("history-html5",function(g){var b=g.HistoryBase,c=g.Lang,f=g.config.win,d=g.config.useHistoryHTML5,h="popstate",e=b.SRC_REPLACE;function a(){a.superclass.constructor.apply(this,arguments);}g.extend(a,b,{_init:function(i){var j=f.history.state;i||(i={});if(i.initialState&&c.type(i.initialState)==="object"&&c.type(j)==="object"){this._initialState=g.merge(i.initialState,j);}else{this._initialState=j;}g.on("popstate",this._onPopState,f,this);a.superclass._init.apply(this,arguments);},_storeState:function(k,j,i){if(k!==h){f.history[k===e?"replaceState":"pushState"](j,i.title||g.config.doc.title||"",i.url||null);}a.superclass._storeState.apply(this,arguments);},_onPopState:function(i){this._resolveChanges(h,i._event.state||null);}},{NAME:"historyhtml5",SRC_POPSTATE:h});if(!g.Node.DOM_EVENTS.popstate){g.Node.DOM_EVENTS.popstate=1;}g.HistoryHTML5=a;if(d===true||(d!==false&&b.html5)){g.History=a;}},"3.4.0",{requires:["event-base","history-base","node-base"],optional:["json"]});YUI.add("history",function(a){},"3.4.0",{use:["history-base","history-hash","history-hash-ie","history-html5"]});