import React from 'react';
import Helmet from 'react-helmet';

export default (props) => (
  <Helmet>
    <script type="application/ld+json">{`
      {
        "@context": "http://schema.org",
          "@type": "Blog",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.madelyneriksen.com${props.slug}"
          },
          "headline": "${props.title}",
          "image": ["https://www.madelyneriksen.com${props.image}"],
          "datePublished": "${props.date}",
          "author": {
            "@type": "Person",
            "name": "Madelyn Eriksen"
          },
          "description": "${props.description}"
      }
    `}</script>
    <meta property="og:title" content={props.title} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={`https://www.madelyneriksen.com${props.slug}`} />
    <meta property="og:image" content={`https://www.madelyneriksen.com${props.image}`} />
    <meta property="og:description" content={props.description} />
    <meta property="og:sitename" content="madelyn.eriksen()" />
    <meta property="og:article:published_time" content={props.date} />
    <meta property="og:article:author:firstname" content="Madelyn" />
    <meta property="og:article:author:lastname" content="Eriksen" />
    <meta property="og:article:author:gender" content="female" />
  </Helmet>
)
