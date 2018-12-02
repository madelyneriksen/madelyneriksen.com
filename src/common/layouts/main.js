import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/header.js';
import Navbar from '../components/navbar.js';
import Sidebar from '../components/sidebar.js';
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
        <Header />
        <div className="blog-grid w-100 mw8 center">
          {this.props.children}
          <Sidebar />
        </div>
      </React.Fragment>
    )
  }
}

export default Layout;
