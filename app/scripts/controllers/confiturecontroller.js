/**
* @module Confiture
*/
define([
	'marionette',
    'controllers/playlistcontroller'
], function (Marionette, PlaylistController) {

    /**
    *   Controls the logic at the application level. It is notably responsible
    *   of instantiating sub-controllers, triggering their displayal and selecting
    *   the active panel.
    *
    *   @class ConfitureController
    */
	var ConfitureController = Marionette.Controller.extend({

        /**
        *   Initialize the application controller.
        *
        *   @method initialize
        */
		initialize: function (options) {
			this.regions = options.regions || {};
            this.controllers = {};
		},

        /**
        *   Set the active panel (region) to the provided target, removing the
        *   active CSS class on any other panel.
        *
        *   @method setActivePanel
        *   @param {string} target Name of the region that should become active.
        */
        setActivePanel: function (target) {
          _.each(this.regions, function (region) {
            if (region === target && region.$el) {
              region.$el.addClass("show-page");
            } else if (region.$el) {
              region.$el.removeClass("show-page");
            }
          });
        },

        /**
        *   Callback that is triggered when the playlist route is hit by the user.
        *   Instantiate the playlist controller if necessary, set its category to
        *   the provided one and display it, making sure its containing panel is
        *   active.
        *
        *   @method playlist
        *   @param {string} type Name of the category of playlist to render.
        */
		playlist: function (type) {
			console.log('[Playlists] Showing Playlist: ', type);

            this._createPlaylistController();
            if (type) {
                this.controllers.playlist.setCategory(type);
            }
            this.controllers.playlist.show();
            this.setActivePanel(this.regions.firstPanel);
		},

        /**
        *   Instantiate a new playlist controller if necessary.
        *
        *   @method _createPlaylistController
        *   @private
        */
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
