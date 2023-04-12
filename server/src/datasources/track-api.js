const { RESTDataSource } = require("@apollo/datasource-rest");

// DATA SOURCE
class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  getTracksForHome() {
    return this.get("tracks");
  }

  getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }
  getTrack(trackId) {
    return this.get(`track/${trackId}`);
  }
  getTrackModules(trackId) {
    return this.get(`track/${trackId}/modules`);
  }
  // Mutation methods
  incrementTrackViews(trackId) {
    // we need to make an HTTP PATCH request, which we can do by callingthis.patch. This method is provided to us by the RESTDataSource class we inherited from.
    return this.patch(`track/${trackId}/numberOfViews`);
  }
}

module.exports = TrackAPI;
