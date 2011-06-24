/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("event-flick",function(c){var g=("ontouchstart" in c.config.win&&!c.UA.chrome)?{start:"touchstart",end:"touchend"}:{start:"mousedown",end:"mouseup"},h="start",k="end",b="ownerDocument",i="minVelocity",e="minDistance",a="preventDefault",d="_fs",f="_fsh",l="_feh",j="nodeType";c.Event.define("flick",{on:function(n,m,p){var o=n.on(g[h],this._onStart,this,n,m,p);m[f]=o;},detach:function(o,n,q){var p=n[f],m=n[l];if(p){p.detach();n[f]=null;}if(m){m.detach();n[l]=null;}},processArgs:function(m){var n=(m.length>3)?c.merge(m.splice(3,1)[0]):{};if(!(i in n)){n[i]=this.MIN_VELOCITY;}if(!(e in n)){n[e]=this.MIN_DISTANCE;}if(!(a in n)){n[a]=this.PREVENT_DEFAULT;}return n;},_onStart:function(q,o,u,n){var m=true,t,s,r=u._extra.preventDefault,p=q;if(q.touches){m=(q.touches.length===1);q=q.touches[0];}if(m){if(r){if(!r.call||r(q)){p.preventDefault();}}q.flick={time:new Date().getTime()};u[d]=q;t=u[l];if(!t){s=(o.get(j)===9)?o:o.get(b);t=s.on(g[k],c.bind(this._onEnd,this),null,o,u,n);u[l]=t;}}},_onEnd:function(z,t,A,q){var x=new Date().getTime(),o=A[d],m=!!o,B=z,p,s,y,v,w,n,u,r;if(m){if(z.changedTouches){if(z.changedTouches.length===1&&z.touches.length===0){B=z.changedTouches[0];}else{m=false;}}if(m){v=A._extra;y=v[a];if(y){if(!y.call||y(z)){B.preventDefault();}}p=o.flick.time;x=new Date().getTime();s=x-p;w=[B.pageX-o.pageX,B.pageY-o.pageY];if(v.axis){r=v.axis;}else{r=(Math.abs(w[0])>=Math.abs(w[1]))?"x":"y";}n=w[(r==="x")?0:1];u=(s!==0)?n/s:0;if(isFinite(u)&&(Math.abs(n)>=v[e])&&(Math.abs(u)>=v[i])){z.type="flick";z.flick={time:s,distance:n,velocity:u,axis:r,start:o};q.fire(z);}A[d]=null;}}},MIN_VELOCITY:0,MIN_DISTANCE:0,PREVENT_DEFAULT:false});},"3.4.0",{requires:["node-base","event-touch","event-synthetic"]});