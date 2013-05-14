define([
	'marionette',
    'controllers/playlistcontroller'
], function (Marionette, PlaylistController) {

	var ConfitureController = Marionette.Controller.extend({

		initialize: function (options) {
			this.container = options.container;
            this._initializeControllers();
		},

		playlists: function () {
			console.log('[Playlists] Accessing Route');
            this.playlistController.show(this.container);
		},

        _initializeControllers: function () {
            this.playlistController = new PlaylistController();
        }

	});

	return ConfitureController;
});
