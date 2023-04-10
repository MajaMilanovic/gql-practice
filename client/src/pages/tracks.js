import React from "react";
import { useQuery, gql } from "@apollo/client";
import TrackCard from "../containers/track-card";
import { Layout, QueryResult } from "../components";

/** TRACKS gql query to retrieve all tracks */
const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        name
        photo
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);
  // - 'data' and 'errors' are the two keys you'll find in the response
  // - note that sometimes when a query returns an error, it can still return some of the data you requested.
  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track, index) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;