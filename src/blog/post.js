import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../common/layouts/main.js';
import PostContent from './post-content.js';
import { graphql } from 'gatsby';


const StructuredData = (props) => (
  <Helmet>
    <script type="application/ld+json">{`
      {
        "@context": "http://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.madelyneriksen.com${props.slug}"
          },
          "headline": "${props.title}",
          "image": ["https://www.madelyneriksen.com${props.image}"],
          "datePublished": "${props.date}",
          "dateModified": "${props.date}",
          "author": {
            "@type": "Person",
            "name": "Madelyn Eriksen"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Madelyn Eriksen",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.madelyneriksen.com/logo.png"
            }
          },
          "description": "${props.description}"
      }
    `}</script>
  </Helmet>
)


export default ({ data }) => {
  const post = data.post;
  const date = data.date.frontmatter.date;
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.metaDescription}>
      <StructuredData
        title={post.frontmatter.title}
        image={post.frontmatter.postImage.childImageSharp.original.src}
        date={date}
        description={post.frontmatter.metaDescription}
        slug={post.frontmatter.slug} />
      <PostContent
        post={post.html}
        title={post.frontmatter.title}
        category={post.frontmatter.category}
        date={post.frontmatter.date}
        image={post.frontmatter.postImage.childImageSharp.fluid} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      frontmatter {
        date(formatString: "MMM Do, YYYY")
        category
        title
        metaDescription
        slug
        postImage {
          childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 1080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    date: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        date
      }
    }
  }
`
