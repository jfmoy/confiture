define([
	'marionette',
    'controllers/basecontroller',
	'views/playlistviews',
	'models/playlist'
],
function(Marionette, BaseController, Views, Playlist) {

	return BaseController.extend({

        initialize: function (options) {
            BaseController.prototype.initialize.call(this, options);
            this.playlist = options.playlist || new Playlist.Playlist();
        },

        setCategory: function (category) {
            var playlistCat = category || "popular";
            this.playlist.setCategory(playlistCat);
            this.playlist.fetch();
        },

		show: function () {
            BaseController.prototype.show.call(this);
            this.playlist.fetch();
		},

		getLayout: function () {
            var layout = new Views.PlaylistLayout();
			this.listenTo(layout, 'show', function() {
				console.log('[Playlist Controller] Showing Playlist Views');
                layout.header.show(this._getPlaylistHeaderView());
				layout.content.show(this._getPlaylistView());
			}, this);

            return layout;
		},

        _getPlaylistHeaderView: function () {
            return new Views.PlaylistHeaderView({
                selected: this.playlist.category || 'popular'
            });
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
