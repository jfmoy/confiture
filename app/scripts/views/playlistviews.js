require([
	'backbone',
	'marionette'
],
function (Backbone, Marionette) {

	var SongView = Marionette.ItemView.extend({

	});

	var PlaylistView = Marionette.CollectionView.extend({

		tagName: 'ul',

		className: 'playlist-content',

		itemView: SongView

	});

});