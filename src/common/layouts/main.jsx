import React, { useState } from 'react';
import Helmet from 'react-helmet';
import Navbar from '../components/navbar';
import Footer from '../components/footer.js';
import '../../sass/index.scss';


const Layout = props => {
  const [scroll, setScroll] = useState(true);
  console.log(setScroll);
  const {
    description,
    title,
    children,
  } = props;
  return (
    <React.Fragment>
      <Helmet>
        <body className={scroll ? null : "noscroll"} />
        <title>{title + " - madelyn.eriksen()"}</title>
        {description &&
            <meta name="description" content={description} />
        }
        <meta name="author" content="Madelyn Eriksen" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Helmet>
      <Navbar setScroll={setScroll} scroll={scroll} />
      <main>
        {children}
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Layout;
