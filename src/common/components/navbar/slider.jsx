import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from '../../links/flex-link';


const NavbarSlider = (props) => {
  const [open, setOpen] = useState(false);

  const {
    links,
    setScroll,
    scroll,
    posts,
  } = props;

  return (
    <section className="navbar__group">
      <button
        onClick={() => {
          setOpen(!open);
          setScroll(!scroll);
        }}
        type="button"
        className="navbar__link"
      >
        {!open ? 'Menu' : 'Close'}
      </button>
      <div
        className={`navbar__menu${open ? ' navbar__menu--active' : ''}`}
      >
        <h3 className="navbar__menu__title">Navigation</h3>
        <div className="navbar__menu__items">
          {links.map(link => (
            <Link
              to={link.to}
              key={link.to}
              activeClassName="pill--active"
              className="pill"
            >
              {link.text}
            </Link>
          ))}
        </div>
        <h3 className="navbar__menu__title">Latest Posts</h3>
        <div className="navbar__menu__items">
          {posts.map(post => (
            <Link
              to={post.slug}
              key={post.slug}
              className="pill"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

NavbarSlider.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setScroll: PropTypes.func.isRequired,
  scroll: PropTypes.bool.isRequired,
};

export default NavbarSlider;
