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

			var c = cheerio.load(data);
			var user = {
				username: c('.profile-datapoints li[title="Username"]').text().trim() || null,
				name: c('.profile-info > h1').text() || null,
				location: c('.profile-datapoints li[title="Location"]').text().trim() || null,
				level: c('.profile-datapoints li[title="Photographer Level"]').text().trim() || null,
				points: c('.profile-datapoints li[title="Photographer Points"]').text().trim() || null,
				statement: c('.profile-statement > p').text().trim() || null,
				statistics: {
					photos: c('a[href="/user/' + username + '/photos"]').text().match(/\d+/)[0] || null,
					marketplace: c('a[href="/user/' + username + '/marketplace"]').text().match(/\d+/)[0] || null,
					nominated: c('a[href="/user/' + username + '/nominated"]').text().match(/\d+/)[0] || null,
					likes: c('a[href="/user/' + username + '/likes"]').text().match(/\d+/)[0] || null,
					followers: c('a[href="/user/' + username + '/followers"]').text().match(/\d+/)[0] || null,
					following: c('a[href="/user/' + username + '/following"]').text().match(/\d+/)[0] || null
				}
			};

			cb(null, user);
		});
	}
};
