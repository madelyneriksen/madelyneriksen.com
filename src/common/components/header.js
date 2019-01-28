import React from 'react';
import 'tachyons';
import { StaticQuery, graphql } from 'gatsby';


export default () => (
  <header className="w-100 flex items-center justify-center vh-25">
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
        <span className="f2 fw3 sans-serif tracked-tight">{data.site.siteMetadata.siteTitle}</span>
      )}
    />
  </header>
)
