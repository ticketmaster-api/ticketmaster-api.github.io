var apiKey = 'XiOrN2UC9yjuR4XF87sdMbRpaVNsP6W2' || apiKeyService.checkApiKeyCookie('tk-api-key') || apiKeyService.getApiExploreKey(); //API Key

module.exports = {
  name: 'apikey',
  style: 'query',
  value: ko.observable(apiKey)
};
