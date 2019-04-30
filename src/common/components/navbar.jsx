import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';


const NavbarSlider = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="navbar__group">
      <button
        onClick={() => setOpen(!open)}
        className="navbar__link">
        Menu
      </button>
      <div
        className={"navbar__menu" + (open ? " navbar__menu--active" : "")}>
        <button
          onClick={() => setOpen(false)}
          className="navbar__link"
          title="Close Menu">
          Close
        </button>
        <div style={{paddingTop: "2rem"}}>
          <Link
            className="pill"
            activeClassName="pill--active"
            to="/">
            Home
          </Link>
          <Link
            className="pill"
            activeClassName="pill--active"
            to="/about">
            About
          </Link>
          <Link
            className="pill"
            activeClassName="pill--active"
            to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}


export default () => (
  <nav className="navbar">
    <section className="navbar__group">
      <h3 className="navbar__title">madelyn.eriksen()</h3>
    </section>
    <section className="navbar__group navbar__buttons">
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
    <NavbarSlider />
  </nav>
)
