# snapwire
> Scrape information from Snapwi.re


## Install

```
$ npm install --save snapwire
```


## Usage

```js
var snapwire = require('snapwire');

snapwire.user('hynden', function (err, user) {
	if (err) {
		console.error(err.message);
	}

	console.log(user);
	/*
	{ 
		username: 'hynden',
		name: 'Andreas Gillström',
		location: 'Sweden',
		level: 'Elite',
		points: '28806pts',
		statement: '25 year old computer engineer and web developer from Sweden.',
		statistics: {
			photos: '587',
			marketplace: '219',
			nominated: '51',
			likes: '2',
			followers: '186',
			following: '0'
		}
	}	
	*/
});

snapwire.userPhotos('hynden', 1, function (err, photos) {
	if (err) {
		console.error(err.message);
	}

	console.log(photos);
	/*
	[
		{
			id: '5552dce0c643c4ff107d84ce',
			url: 'https://www.snapwi.re/photo/detail/5552dce0c643c4ff107d84ce',
			img: 'https://swca.s3-us-west-1.amazonaws.com/1216/5552dce0c643c4ff107d84ce.w314.jpg'
		}, ...
	]
	*/
});
```

### API

#### snapwire.user(username, [callback])
#### snapwire.userPhotos(username, page, [callback])


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
