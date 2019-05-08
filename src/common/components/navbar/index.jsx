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
        {
          site {
            siteMetadata {
              navbarLinks {
                to
                text
              }
            }
          }
          allMarkdownRemark(
            filter: {frontmatter: {type: {eq: "post"}}},
            sort: {fields: [frontmatter___date], order: DESC},
            limit: 3,
          ) {
            edges {
              node {
                frontmatter {
                  slug
                  title
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const links = data.site.siteMetadata.navbarLinks;
        const { edges } = data.allMarkdownRemark;
        const posts = edges.map(edge => edge.node.frontmatter);
        return (
          <nav className="navbar">
            <section className="navbar__group">
              <Link className="navbar__title" to="/">madelyn.eriksen()</Link>
            </section>
            <section className="navbar__group navbar__buttons">
              {links.map(LinkData => (
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
              links={links}
              posts={posts}
            />
          </nav>
        );
      }}
    />
  );
};

Navbar.propTypes = {
  scroll: PropTypes.bool.isRequired,
  setScroll: PropTypes.func.isRequired,
};

export default Navbar;
