var apiKey = apiKeyService.getApiKeysCookie() || apiKeyService.getApiExploreKey(); //API Key

module.exports = {
	placeholder: 'Api key',
  name: 'apikey',
  style: 'query',
  value: ko.observable(apiKey),
	type: 'string',
	required: true
};
