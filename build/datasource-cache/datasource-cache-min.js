/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("datasource-cache",function(c){var b=function(){};c.mix(b,{NS:"cache",NAME:"dataSourceCacheExtension"});b.prototype={initializer:function(d){this.doBefore("_defRequestFn",this._beforeDefRequestFn);this.doBefore("_defResponseFn",this._beforeDefResponseFn);},_beforeDefRequestFn:function(f){var d=(this.retrieve(f.request))||null;if(d&&d.response){this.get("host").fire("response",c.mix(d,f));return new c.Do.Halt("DataSourceCache extension halted _defRequestFn");}},_beforeDefResponseFn:function(d){if(d.response&&!d.cached){this.add(d.request,d.response);}}};c.namespace("Plugin").DataSourceCacheExtension=b;function a(f){var e=f&&f.cache?f.cache:c.Cache,g=c.Base.create("dataSourceCache",e,[c.Plugin.Base,c.Plugin.DataSourceCacheExtension]),d=new g(f);g.NS="tmpClass";return d;}c.mix(a,{NS:"cache",NAME:"dataSourceCache"});c.namespace("Plugin").DataSourceCache=a;},"3.4.0",{requires:["datasource-local","cache-base","plugin"]});