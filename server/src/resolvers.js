const resolvers = {
  // try to keep resolver functions as thin as possible
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    /**
     *
     * @param {*} parent
     * @param {*} args
     * @param {*} contextValue
     * @param {*} info
     ****** parent:
     * parent is the returned value of the resolver for this field's parent. This will be useful when dealing with resolver chains.
     ****** args:
     * args is an object that contains all GraphQL arguments that were provided for the field by the GraphQL operation. When querying for a specific item (such as a specific track instead of all tracks), in client-land we'll make a query with an id argument that will be accessible via this args parameter in server-land. We'll cover this further in Lift-off III.
     ****** contextValue:
     * contextValue is an object shared across all resolvers that are executing for a particular operation. The resolver needs this argument to share state, like authentication information, a database connection, or in our case the RESTDataSource.
     ****** info:
     * info contains information about the operation's execution state, including the field name, the path to the field from the root, and more. It's not used as frequently as the others, but it can be useful for more advanced actions like setting cache policies at the resolver level.
     */
    // tracksForHome: (parent, args, contextValue, info) => {},
    tracksForHome: (_, __, { dataSources }) => {
      // trackAPI - lowercase here as it's the instance of our TrackAPI class extending RESTDataSource
      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  // Mutations
  Mutation: {
    // resolver function needs to have the same name as in our schema
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: (parent, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(parent.authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
