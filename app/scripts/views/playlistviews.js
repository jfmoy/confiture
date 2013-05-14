define([
	'marionette'
],
function (Marionette) {

    var PlaylistLayout = Marionette.Layout.extend({

        className: 'page page-playlist',

        template: 'playlist_layout',

        regions: {
            header: '.playlist-header',
            content: '.playlist-container'
        }
    });

	var SongView = Marionette.ItemView.extend({

        template: 'song_view',

        tagName: 'li',

        className: 'song'

	});

	var PlaylistView = Marionette.CollectionView.extend({

		tagName: 'ul',

		className: 'playlist-content',

		itemView: SongView

	});

    return {
        PlaylistLayout: PlaylistLayout,
        PlaylistView: PlaylistView,
        SongView: SongView
    };

});
