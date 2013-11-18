/**
*   @module Base
*/
/*global define:false */
define([
  // Application.
  "backbone",
  "marionette"
],
function (Backbone, Marionette) {

    /**
    *   Controller that offers a few functions such as rendering content in a provided region,
    *   cleaning up the views, etc.
    *
    *   To determine what needs to be rendered, the controller calls the _getLayout function.
    *   This BaseController is not meant to be used as is and should be extended by custom
    *   controllers.
    *
    *   @class BaseController
    */
    var BaseController = Marionette.Controller.extend({

        initialize: function (options) {
          this.region = options.region;
        },

        show: function () {
          this.layout = this._getLayout();
          if (this.region && this.layout) {
            this.region.show(this.layout);
          }
        },

        onClose: function () {
          this._closeLayout();
        },

        _getLayout: function () {
          this._closeLayout();
          var layout = this.getLayout();
          return layout;
        },

        _closeLayout: function () {
          if (this.layout) {
            this.layout.close();
            delete this.layout;
          }
        }
    });

    return BaseController;

});
