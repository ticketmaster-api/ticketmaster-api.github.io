var apiKey = sessionStorage.getItem('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key

module.exports = {
  name: 'apikey',
  style: 'query',
  value: ko.observable(apiKey)
};