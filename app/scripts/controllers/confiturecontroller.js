define([
	'marionette',
    'controllers/playlistcontroller'
], function (Marionette, PlaylistController) {

	var ConfitureController = Marionette.Controller.extend({

		initialize: function (options) {
			this.regions = options.regions || {};
            this.controllers = {};
		},

        setActivePanel: function (target) {
          _.each(this.regions, function (region) {
            if (region === target && region.$el) {
              region.$el.addClass("show-page");
            } else if (region.$el) {
              region.$el.removeClass("show-page");
            }
          });
        },

		playlist: function (type) {
			console.log('[Playlists] Showing Playlist: ', type);

            this._createPlaylistController();
            if (type) {
                this.controllers.playlist.setCategory(type);
            }
            this.controllers.playlist.show();
            this.setActivePanel(this.regions.firstPanel);
		},

        _createPlaylistController: function () {
            if (!this.controllers.playlist) {
                console.log('Confiture Controller > Creating Playlist Controller');
                this.controllers.playlist = new PlaylistController({
                    region: this.regions.firstPanel
                });
            }
        },

	});

	return ConfitureController;
});
