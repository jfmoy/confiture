define([
	'marionette'
], function (Marionette) {

	var ConfitureController = Marionette.Controller.extend({

		initialize: function (options) {
			this.container = options.container;
		},

		playlists: function () {
			console.log("[Playlists] Accessing Route");
		}
		
	});

	return ConfitureController;
});