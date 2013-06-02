define([
	'marionette',
	'views/playlistviews',
	'models/playlist'
],
function(Marionette, Views, Playlist) {

	return Marionette.Controller.extend({

        initialize: function (options) {
            this.region = options.region;
            this.playlist = new Playlist.Playlist();
        },

		show: function () {
            this._closeLayout();
            this.layout = this._getLayout();
			this.region.show(this.layout);
            defaultPlaylist.fetch();
		},

		getLayout_: function () {
			var layout = new Views.PlaylistLayout();
			this.listenTo(this.region, 'show', function() {
				console.log('[Playlist Controller] Showing Playlist Views');
				layout.content.show(this._getPlaylistView());
				layout.$el.addClass('show-page');
			}, this);
			return layout;
		},

        _getPlaylistHeaderView: function () {
            return new Views.PlaylistHeaderView();
        },

		_getPlaylistView: function () {
			var defaultPlaylistView = new Views.PlaylistView({
				collection: this.playlist
			});

			return defaultPlaylistView;
		},

        _closeLayout: function () {
            if (this.layout) {
                this.layout.close();
                delete this.layout;
            }
        }

	});

});
