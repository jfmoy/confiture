/*global describe, it, define */
'use strict';
define([
	'models/playlist'
], function (Models) {
	describe('Playlist', function () {

		it('Playlist Instantiation', function () {
			var playlist = new Models.Playlist();
			expect(playlist).not.to.be.eql(null);
		});

	    it('Playlist has a category', function () {
	    	var playlist = new Models.Playlist();
			expect(playlist.category).to.have.property('length');
			expect(playlist.category.length).not.to.be.eql(0);
	    });

	    it('Playlist category update', function () {
	    	var playlist = new Models.Playlist();
	    	playlist.setCategory('new_category');
			expect(playlist.category).to.be.eql('new_category');
	    });
	});
});