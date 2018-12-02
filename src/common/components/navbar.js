import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import 'tachyons';
import Link from '../links/hover-link.js';


export default () => (
  <nav className="bg-white w-100 flex justify-center ph2 pv3">
    <div className="flex flex-wrap items-center justify-around w-100 mw8">
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
    </div>
  </nav>
)
