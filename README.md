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

```


## License

MIT © [Andreas Gillström](https://github.com/gillstrom)
