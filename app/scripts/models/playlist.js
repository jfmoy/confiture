define([
	'backbone'
], function (Backbone) {

	var Song = Backbone.Model.extend({

	});

	var Playlist = Backbone.Collection.extend({

		url: 'http://api.thisismyjam.com/1/explore/popular.json',

		model: Song,

		/*
		*	Using This Is My Jam, the songs are stored in the jams
		*	property.
		*/
		parse: function (data) {
			return data.jams || {};
		}

	});

	return {
		Song: Song,
		Playlist: Playlist
	}

});