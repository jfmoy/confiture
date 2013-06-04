define([
	'backbone'
], function (Backbone) {

	var Song = Backbone.Model.extend({

	});

	var Playlist = Backbone.Collection.extend({

        model: Song,

        setCategory: function (category) {
            this.category = category;
        },

		url: function() {
            var category = this.category || 'popular';
            return 'http://api.thisismyjam.com/1/explore/' + category + '.json'
        },

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
