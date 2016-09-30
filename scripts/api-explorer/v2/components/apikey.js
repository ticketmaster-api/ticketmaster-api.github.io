var apiKey = sessionStorage.getItem('tk-api-key') || "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"; //API Key

module.exports = {
  name: 'apikey',
  style: 'query',
  value: ko.observable(apiKey)
};