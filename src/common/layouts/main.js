import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/header.js';
import Navbar from '../components/navbar.js';
import Sidebar from '../components/sidebar.js';
import Footer from '../components/footer.js';
import '../../sass/index.scss';


class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <body className="bg-near-white mid-gray" />
          <title>{this.props.title + " - madelyn.eriksen()"}</title>
          <meta name="description" content={this.props.description} />
          <meta name="author" content="Madelyn Eriksen" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Helmet>
        <Navbar />
        <Header />
        <main class="main-grid">
          {this.props.children}
          <Sidebar />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Layout;
