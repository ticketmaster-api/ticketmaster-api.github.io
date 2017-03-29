export default {
  "Discovery API v2" : {
		meta: require("_data/orgs/discovery-api/v2/methods-metadata.json"),
		apiContext: require.context("_data/orgs/discovery-api/v2/api", true, /\.json$/) // all json files from
																																										// '_data/orgs/discovery-api/v2/api'
	}
}
