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
  },
  Track: {
    author: (parent, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(parent.authorId);
    },
  },
};

module.exports = resolvers;
