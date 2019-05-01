import React, { useState } from 'react';
import Link from '../../links/flex-link';


const NavbarSlider = (props) => {
  const [open, setOpen] = useState(false);

  const { links, setScroll, scroll } = props;

  return (
    <section className="navbar__group">
      <button
        onClick={() => {
          setOpen(!open);
          setScroll(!scroll);
        }}
        className="navbar__link">
        {!open ? "Menu" : "Close"}
      </button>
      <div
        className={"navbar__menu" + (open ? " navbar__menu--active" : "")}>
        <div className="navbar__menu__items">
          {links.map(link => (
            <Link
              to={link.to}
              key={link.to}
              activeClassName="pill--active"
              className="pill">
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
};

export default NavbarSlider;
