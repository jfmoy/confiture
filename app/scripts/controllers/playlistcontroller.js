define([
	'marionette',
	'views/playlistviews',
	'models/playlist'
], 
function(Marionette, Views, Playlist) {

	return Marionette.Controller.extend({

		show: function (region) {
			this.region = region;
			this.layout = this._getPlaylistLayout();
			this.region.show(this.layout);
		},

		_getPlaylistLayout: function () {
			var layout = new Views.PlaylistLayout();
			this.listenTo(this.region, 'show', function() {
				console.log('[Playlist Controller] Showing Playlist Views');
				layout.content.show(this._getPlaylistView());
				layout.$el.addClass('show-page');
			}, this);
			return layout;
		},

		_getPlaylistView: function () {
			// Create an empty playlist that we will fetch later on.
			var defaultPlaylist = new Playlist.Playlist();
			defaultPlaylist.fetch();

			var defaultPlaylistView = new Views.PlaylistView({
				collection: defaultPlaylist
			});

			return defaultPlaylistView;
		}

	});

});