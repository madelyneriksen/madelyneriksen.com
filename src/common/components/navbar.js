import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../links/hover-link.js';


export default () => (
  <nav className="navbar">
    <StaticQuery query={graphql`
        query {
          site {
            siteMetadata {
              navbarLinks {
                to
                text
              }
            }
          }
        }
      `}
      render={data => data.site.siteMetadata.navbarLinks.map((LinkData) => (
        <Link to={LinkData.to}>{LinkData.text}</Link>
      ))} />
  </nav>
)
