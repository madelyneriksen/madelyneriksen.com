import React from 'react';
import 'tachyons';
import Link from '../links/hover-link.js';


export default () => (
  <nav className="bg-white w-100 flex justify-center ph2 pv3">
    <div className="flex flex-wrap items-center justify-around w-100 mw8">
      <Link to="/about">ABOUT</Link>
    </div>
  </nav>
)
