import React from 'react';
import { StaticQuery, graphql } from 'gatsby';


export default () => (
  <header className="header">
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              siteTitle
            }
          }
        }
      `}
      render={data => (
        <h1>{data.site.siteMetadata.siteTitle}</h1>
      )}
    />
  </header>
)
