'use strict';

var got = require('got');
var cheerio = require('cheerio');

module.exports = {
	user: function (username, cb) {
		if (typeof username !== 'string') {
			throw new Error('Username is required');
		}

		var url = 'https://www.snapwi.re/user/' + username;

		got(url, function (err, data) {
			if (err) {
				cb(new Error('This user doesn\'t exist'));
			}

			var $ = cheerio.load(data);
			var user = {
				username: $('.profile-datapoints li[title="Username"]').text().trim() || null,
				name: $('.profile-info > h1').text() || null,
				location: $('.profile-datapoints li[title="Location"]').text().trim() || null,
				level: $('.profile-datapoints li[title="Photographer Level"]').text().trim() || null,
				points: $('.profile-datapoints li[title="Photographer Points"]').text().trim() || null,
				statement: $('.profile-statement > p').text().trim() || null,
				statistics: {
					photos: $('a[href="/user/' + username + '/photos"]').text().match(/\d+/)[0] || null,
					marketplace: $('a[href="/user/' + username + '/marketplace"]').text().match(/\d+/)[0] || null,
					nominated: $('a[href="/user/' + username + '/nominated"]').text().match(/\d+/)[0] || null,
					likes: $('a[href="/user/' + username + '/likes"]').text().match(/\d+/)[0] || null,
					followers: $('a[href="/user/' + username + '/followers"]').text().match(/\d+/)[0] || null,
					following: $('a[href="/user/' + username + '/following"]').text().match(/\d+/)[0] || null
				}
			};

			cb(null, user);
		});
	},
	userPhotos: function (username, page, cb) {
		if (typeof username !== 'string') {
			throw new Error('Username is required');
		}

		if (!cb && typeof page === 'function') {
			cb = page;
			page = 1;
		}

		var url = 'https://www.snapwi.re/user/' + username + '?page=' + page;

		got(url, function (err, data) {
			if (err) {
				cb(new Error('This user doesn\'t exist'));
			}

			var $ = cheerio.load(data);
			var p = $('.sw-card-photo');
			var photos = [];

			for (var i = 0; i < p.length; i++) {
				photos.push({
					id: $(p[i]).data('photo-id'),
					url: 'https://www.snapwi.re' + $(p[i]).find('.photo-wrapper > a').attr('href'),
					img: $(p[i]).find('.photo-wrapper > a > img').attr('src')
				});
			}

			cb(null, photos);
		});
	}
};
