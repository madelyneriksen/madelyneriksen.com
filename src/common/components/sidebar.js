import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../links/hover-link.js';
import Container from '../containers/text-container.js';
import Me from '../../../content/img/me.jpeg';


export default () => (
  <aside>
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              sideBar {
                links {
                  to
                  text
                }
                bio
              }
            }
          }
        }
      `}
      render={data => (
    <React.Fragment>
        <img src={Me} alt="The Author" />
        <p>{data.site.siteMetadata.sideBar.bio}</p> 
      {data.site.siteMetadata.sideBar.links.map((link) => (
        <Link to={link.to}>{link.text}</Link>
      ))}
    </React.Fragment>)} />
  </aside>
)
