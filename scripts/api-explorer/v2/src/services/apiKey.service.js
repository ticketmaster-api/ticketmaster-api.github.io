var apiKey = apiKeyService.checkApiKeyCookie('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key

module.exports = {
	placeholder: 'Api key',
  name: 'apikey',
  style: 'query',
  value: ko.observable(apiKey),
	type: 'string',
	required: true
};
