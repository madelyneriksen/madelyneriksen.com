import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Seo = (props) => {
  const {
    slug,
    image,
    title,
    description,
    date,
  } = props;
  return (
    <Helmet>
      <script type="application/ld+json">
        {`
        {
          "@context": "http://schema.org",
            "@type": "Blog",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.madelyneriksen.com${slug}"
            },
            "headline": "${title}",
            "image": ["https://www.madelyneriksen.com${image}"],
            "datePublished": "${date}",
            "author": {
              "@type": "Person",
              "name": "Madelyn Eriksen"
            },
            "description": "${description}"
        }
      `}
      </script>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://www.madelyneriksen.com${slug}`} />
      <meta property="og:image" content={`https://www.madelyneriksen.com${image}`} />
      <meta property="og:description" content={description} />
      <meta property="og:sitename" content="madelyn.eriksen()" />
      <meta property="og:article:published_time" content={date} />
      <meta property="og:article:author:firstname" content="Madelyn" />
      <meta property="og:article:author:lastname" content="Eriksen" />
      <meta property="og:article:author:gender" content="female" />
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Seo;
