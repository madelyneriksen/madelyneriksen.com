import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../../links/flex-link';
import NavbarSlider from './slider';


export default () => (
  <StaticQuery
    query={graphql`
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
      render={data => (
        <nav className="navbar">
          <section className="navbar__group">
            <h3 className="navbar__title">madelyn.eriksen()</h3>
          </section>
          <section className="navbar__group navbar__buttons">
            {data.site.siteMetadata.navbarLinks.map((LinkData) => (
              <Link
                to={LinkData.to}
                activeClassName="navbar__link--active"
                className="navbar__link">
                {LinkData.text}
              </Link>
            ))}
        </section>
        <NavbarSlider links={data.site.siteMetadata.navbarLinks} />
      </nav>
      )}
    />
)
