import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../../links/flex-link';
import NavbarSlider from './slider';


const Navbar = (props) => {
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

Navbar.propTypes = {
  scroll: PropTypes.bool.isRequired,
  setScroll: PropTypes.func.isRequired,
};

export default Navbar;
