import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/header.js';
import Navbar from '../components/navbar.js';
import Sidebar from '../components/sidebar.js';
import Footer from '../components/footer.js';
import 'tachyons';
import './styles/custom.tachyons.css';
import './styles/grid.css';


class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <body className="bg-near-white mid-gray" />
          <title>{this.props.title + " - madelyn.eriksen()"}</title>
          <meta name="description" content={this.props.description} />
          <meta name="author" content="Madelyn Eriksen" />
        </Helmet>
        <Navbar />
        <Header />
        <div className="blog-grid w-100 mw8 center">
          {this.props.children}
          <Sidebar />
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Layout;
