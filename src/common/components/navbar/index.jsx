import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../../links/flex-link';
import NavbarSlider from './slider';


export default (props) => {
  const { scroll, setScroll } = props;
  return (
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
            <Link className="navbar__title" to="/">madelyn.eriksen()</Link>
          </section>
          <section className="navbar__group navbar__buttons">
            {data.site.siteMetadata.navbarLinks.map(LinkData => (
              <Link
                to={LinkData.to}
                activeClassName="navbar__link--active"
                className="navbar__link"
              >
                {LinkData.text}
              </Link>
            ))}
          </section>
          <NavbarSlider
            setScroll={setScroll}
            scroll={scroll}
            links={data.site.siteMetadata.navbarLinks}
          />
        </nav>
      )}
    />
  );
};
