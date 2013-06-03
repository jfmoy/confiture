/*global define:false */
define([
  // Application.
  "backbone",
  "marionette"
],
function (Backbone, Marionette) {

  /**
  *
  * Default Controller implementation for Libon. The layout should
  * be returned by children controllers using the getLayout method.
  *
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
