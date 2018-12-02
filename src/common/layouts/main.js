import React from 'react';
import Helmet from 'react-helmet';
import Navbar from '../components/navbar.js';
import 'tachyons';
import './styles/custom.tachyons.css';
import './styles/grid.css';


class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <body className="bg-near-white mid-gray" />
        </Helmet>
        <Navbar />
        <div className="blog-grid w-100 mw8 center">
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default Layout;
