import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../../sass/index.scss';


const Layout = (props) => {
  const {
    description,
    title,
    children,
  } = props;
  return (
    <React.Fragment>
      <Helmet>
        <body />
        <title>{`${title} - madelyn.eriksen()`}</title>
        {description
            && <meta name="description" content={description} />
        }
        <meta name="author" content="Madelyn Eriksen" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Helmet>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
};

Layout.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Layout.defaultProps = {
  description: false,
};

export default Layout;
