/**
*   Responsible of rendering the playlist and triggering the fetching of the playlist from
*   This Is My Jam API.
*
*   @module Confiture
*   @class PlaylistController
*/
define([
	'marionette',
    'controllers/basecontroller',
	'views/playlistviews',
	'models/playlist'
],
function(Marionette, BaseController, Views, Models) {

	return BaseController.extend({

        /**
        *   @method initialize
        *   @param {object} options Object that should contain the region we render the view in,
        *   and possibly a playlist that can be reused.
        */
        initialize: function (options) {
            BaseController.prototype.initialize.call(this, options);
            this.playlist = options.playlist || new Models.Playlist();
        },

        /**
        *   Changes the current category for the provided one. If none is provided,
        *   defaults to popular.
        *
        *   @method setCategory
        *   @param {string} category Name of the category for the playlist.
        */
        setCategory: function (category) {
            this.playlist.reset();

            var playlistCat = category || "popular";
            this.playlist.setCategory(playlistCat);
        },

        /**
        *   Show the playlist view by rendering it in the region that has been provided when instantiating
        *   the controller. Also fetch the playlist from This Is My Jam API.
        *   @method show
        */
		show: function () {
            BaseController.prototype.show.call(this);
            this.playlist.fetch();
		},

        /**
        *   Return the layout used to render the Playlist View. The views composing the playlist view are
        *   rendered asynchronously when the layout is shown.
        *   @method getLayout
        *   @return {Layout} A Marionette layout containing the playlist view that can be shown later on.
        */
		getLayout: function () {
            var layout = new Views.PlaylistLayout();
			this.listenTo(layout, 'show', function() {
				console.log('[Playlist Controller] Showing Playlist Views');
                layout.header.show(this._getPlaylistHeaderView());
				layout.content.show(this._getPlaylistView());
			}, this);

            return layout;
		},

        /**
        *   Instantiates and return the playlist header view.
        *   @method _getPlaylistHeaderView
        *   @private
        *   @return {Marionette.ItemView}   Playlist Header View
        */
        _getPlaylistHeaderView: function () {
            return new Views.PlaylistHeaderView({
                selected: this.playlist.category || 'popular'
            });
        },

        /**
        *   Instantiates and return the playlist header view.
        *   @method _getPlaylistHeaderView
        *   @private
        *   @return {Marionette.ItemView}   Playlist Header View
        */
		_getPlaylistView: function () {
			var defaultPlaylistView = new Views.PlaylistView({
				collection: this.playlist
			});

			return defaultPlaylistView;
		},

        /**
        *   Close the layout, ie. clean the registered listeners, remove the DOM elements,
        *   and delete the layout.
        *   @method _closeLayout
        *   @private
        */
        _closeLayout: function () {
            if (this.layout) {
                this.layout.close();
                delete this.layout;
            }
        }

	});

});
