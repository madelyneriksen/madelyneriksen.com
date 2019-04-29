import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';


export default () => (
  <nav className="navbar">
    <section className="navbar__group">
      <h3 className="navbar__title">madelyn.eriksen()</h3>
    </section>
    <section className="navbar__group">
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
          <Link
            to={LinkData.to}
            activeClassName="navbar__link--active"
            className="navbar__link">
            {LinkData.text}
          </Link>
        ))} />
    </section>
    <section class="navbar__group">
      <Link class="navbar__link">Menu</Link>
    </section>
  </nav>
)
