define([
	'marionette',
    'controllers/playlistcontroller'
], function (Marionette, PlaylistController) {

	var ConfitureController = Marionette.Controller.extend({

		initialize: function (options) {
			this.container = options.container;
            this.controllers = {};
		},

		playlist: function (type) {
			console.log('[Playlists] Showing Playlist: ', type);

            this._createPlaylistController();
            this.controllers.playlist.show(this.container);
		},

        _createPlaylistController: function () {
            if (!this.controllers.playlist) {
                this.controllers.playlist = new PlaylistController();
            }
        },

	});

	return ConfitureController;
});
