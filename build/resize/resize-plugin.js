/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add('resize-plugin', function(Y) {

/**
 * The Resize Plugin allows you to make a Node or a Widget resizable. It supports all the functionality of
 * the standalone Resize utility. Additionally, resizing a widget updates the widget's height,width and x,y
 * attributes, if they exist.
 *
 * @module resize-plugin
 */
var ResizePlugin = function(config) {

                //if its a widget, get the bounding box
                config.node = ((Y.Widget && config.host instanceof Y.Widget) ? config.host.get('boundingBox') : config.host);
                if (config.host instanceof Y.Widget) {
                        config.widget = config.host;
                }
                else {
                        config.widget = false;
                }

                ResizePlugin.superclass.constructor.call(this, config);
        };
        
        /**
        * @property NAME
        * @description resize-plugin
        * @type {String}
        */
        ResizePlugin.NAME = "resize-plugin";

        /**
        * @property NS
        * @description The Resize instance will be placed on the Node instance under the resize namespace. It can be accessed via Node.resize or Widget.resize;
        * @type {String}
        */
        ResizePlugin.NS = "resize";

        /**
         * Static property used to define the default attribute
         * configuration for the Resize plugin.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ResizePlugin.ATTRS = {

              /**
               * Stores the node that is being resized
               *
               * @attribute node
               * @default undefined
               * @public
               */
                node: {
                        value: undefined,
                },

                /**
                 * Stores the widget that the node belongs to, if one exists
                 *
                 * @attribute widget
                 * @default undefined
                 * @public
                 */
                widget: {
                        value:undefined
                }
        };


        Y.extend(ResizePlugin, Y.Resize, {
                
                /**
                 * Stores the values for node and widget, and sets up an event-listener
                 *
                 * @method initializer
                 * @protected
                 */
                initializer: function(config) {

                        this.set('node', config.node);
                        this.set('widget', config.widget);

                        this.on('resize:resize', function(e) {
                                this._correctDimensions(e);
                        });             
                },

                /**
                 * Updates the node's (x,y) values if they are changed via resizing.
                 * If the node belongs to a widget, passes the widget down to _setWidgetProperties method
                 *
                 * @method _correctDimensions
                 * @param {EventFacade} e The Event object
                 * @private
                 */
                _correctDimensions: function(e) {

                        var node = this.get('node'),
                        x = {
                            old: node.getX(),
                            cur: e.currentTarget.info.left
                        },
                        y = {
                            old: node.getY(),
                            cur: e.currentTarget.info.top
                        };

                        
                        if (this.get('widget')) {
                            this._setWidgetProperties(e, x, y);
                        }

                        //now set properties on just the node or the widget's bounding box
                        if (this._isDifferent(x.old, x.cur)) {
                            node.set('x', x.cur);
                        }

                        if (this._isDifferent(y.old, y.cur)) {
                            node.set('y', y.cur);
                        }

                },

                
                   /**
                    * If the host is a widget, then set the width, height. Then look for widgetPosition and set x,y
                    *
                    * @method _setWidgetProperties
                    * @param {EventFacade} e The Event object
                    * @param {Object} x Literal containing old x value and current x value
                    * @param {Object} y Literal containing old y value and current y value
                    * @private
                    */
                   _setWidgetProperties: function(e,x,y) {
                       //all widgets have width/height attrs. change these only if they differ from the old values

                       var widget = this.get('widget'),
                       oldHeight = widget.get('height'),
                       oldWidth = widget.get('width'),
                       currentWidth = e.currentTarget.info.offsetWidth - e.currentTarget.totalHSurrounding,
                       currentHeight = e.currentTarget.info.offsetHeight - e.currentTarget.totalVSurrounding;

                       if (this._isDifferent(oldHeight, currentHeight)) {
                          widget.set('height', currentHeight);
                       }

                       if (this._isDifferent(oldWidth, currentWidth)) {
                          widget.set('width', currentWidth);
                       }

                       

                       //If the widget uses Y.WidgetPosition, it will also have x,y position support. 
                       if (widget.hasImpl && widget.hasImpl(Y.WidgetPosition)) {

                           //console.log('new values: ' + x.current + ', ' + x.old);
                           // console.log('old values: ' + x.old + ', ' + y.old);
                           
                           if (this._isDifferent(widget.get('x'), x.cur)) {
                               widget.set('x', x.cur);
                           }

                           if (this._isDifferent(widget.get('y'), y.cur)) {
                               widget.set('y', y.cur);
                           }
                           

                       }
                   },

                   /**
                      * a little utility method that returns a value if the old !== new, otherwise it returns false.
                      *
                      * @method _isDifferent
                      * @param {Number} oldVal 
                      * @param {Number} newVal
                      * @private
                      */
                   _isDifferent: function(oldVal, newVal) {
                       if (oldVal !== newVal) {
                           return newVal;
                       }
                       else {
                           return false;
                       }
                   }


        });
        Y.namespace('Plugin');
        Y.Plugin.Resize = ResizePlugin;


}, '3.4.0' ,{optional:['resize-constrain'], skinnable:false, requires:['resize-base', 'plugin']});
