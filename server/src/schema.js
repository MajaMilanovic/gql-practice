const gql = require("graphql-tag");

/** NOTES:
 *  how to tell the GraphQL server what to retrieve when we query it?
 *  we don't have multiple specific endpoints to target different types like a REST API does.
 *  Instead, we define a special Query type.
 */

const typeDefs = gql`
  """
  The fields of Query type are entry points into the rest of our schema.
  These are the top-level fields that our client can query for
  """
  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main author"
    author: Author!
    "The track's main illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
  }

  "Author of a complete Track"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String
  }
`;
module.exports = typeDefs;

/** EXAMPLE:
 *  type Employee {
 	 title: String!
  	 roles: [Role]
 	   name: String! // scalar field - does not have additional subfields
  	 id: String!
   	 description: String
  	 thumbnail: Thumbnail
  	 contact: Contact //  field that returns an object type, along with all of the object type's subfields
	}
 */

/** Example:
 *     ||
       \/

  "Space Cat Type"
  type SpaceCat {
    id: ID!
    name: String!
    age: Int
    missions: [Mission]
  }

  type Mission {
    id: ID!
    name: String!
    description: String!
  }
      ||
      \/

 * Test cases would be:
 * √ should have a type Query
 * √ Query should have a spaceCats field
 * √ spaceCats field should be of type List of SpaceCat
 * √ should have a type SpaceCat
 * √ should have a type Mission
 * √ SpaceCat type should have a id field
 * ... etc - for each field
 */
