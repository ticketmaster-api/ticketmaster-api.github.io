var countryCodes = require('../../../../../../_data/orgs/discovery-api/v2/countryCode.json');


export default [{
		name: 'none',
		checked: false,
		link: false
	},
	...countryCodes.CountryCode.map((codeAndCountry, i) => ({
		name: codeAndCountry.substr(4, codeAndCountry.length - 5), // or you can use regexp \(([a-zA-Z\s]+)\)
		value: codeAndCountry.substr(0, 2),
		checked: !i,
		link: false
	}))
]
