import React from 'react';
import 'tachyons';
import { StaticQuery, graphql } from 'gatsby';


export default () => (
  <div className="w-100 flex items-center justify-center vh-25">
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
        <h1 className="fw3 sans-serif tracked-tight">{data.site.siteMetadata.siteTitle}</h1>
      )}
    />
  </div>
)
