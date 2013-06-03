define([
	'marionette'
],
function (Marionette) {

    var PlaylistLayout = Marionette.Layout.extend({

        className: 'playlist',

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

		itemView: SongView,

        // emptyView: 'playlist_empty'

	});

    var PlaylistHeaderView = Marionette.ItemView.extend({

        className: 'pure-menu pure-menu-open pure-menu-horizontal',

        template: 'playlist_header',

        events: {
            'click li' : 'onCategorySelected'
        },

        initialize: function (options) {
            this.selected = options.selected;
        },

        // Used to perform the first selection, could parse the URL.
        onDomRefresh: function () {
            if (this.selected) {
                this.selectItem(this.$('.js-' + this.selected + '-playlist-item'));
                delete this.selected;
            }
        },

        onCategorySelected: function (target) {
            this.selectItem($(target));
        },

        selectItem: function ($item) {
            this.$('pure-menu-selected').toggleClass('pure-menu-selected');
            $item.addClass('pure-menu-selected');
        }

    });

    return {
        PlaylistLayout: PlaylistLayout,
        PlaylistView: PlaylistView,
        PlaylistHeaderView: PlaylistHeaderView,
        SongView: SongView
    };

});
