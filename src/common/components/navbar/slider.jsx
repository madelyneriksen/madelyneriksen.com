import React, { useState } from 'react';
import Link from '../../links/flex-link';


const NavbarSlider = (props) => {
  const [open, setOpen] = useState(false);

  const { links } = props;

  return (
    <section className="navbar__group">
      <button
        onClick={() => setOpen(!open)}
        className="navbar__link">
        Menu
      </button>
      <div
        className={"navbar__menu" + (open ? " navbar__menu--active" : "")}>
        <div className="navbar__menu__items">
          {links.map(link => (
            <Link
              to={link.to}
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
