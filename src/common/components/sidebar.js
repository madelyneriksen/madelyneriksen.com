import React from 'react';
import 'tachyons';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../links/hover-link.js';
import Container from '../containers/text-container.js';
import Me from '../../../content/img/me.jpeg';


export default () => (
  <aside className="flex flex-wrap flex-column" style={{gridArea: "sidebar"}}>
    <div style={{position: "sticky", top: ".5rem"}}>
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
        <div className="w-100 mv2 bg-white">
          <img src={Me} alt="The Author" />
          <Container>
            <p>{data.site.siteMetadata.sideBar.bio}</p> 
          </Container>
        </div>

        {data.site.siteMetadata.sideBar.links.map((link) => (
          <div className="w-100 mv2 bg-white">
            <div className="tc pa3">
              <Link to={link.to}>{link.text}</Link>
            </div>
          </div>
        ))}
      </React.Fragment>)} />
    </div>
  </aside>
)
