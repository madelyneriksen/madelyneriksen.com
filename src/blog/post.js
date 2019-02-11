import React from 'react';
import Seo from './seo';
import Layout from '../common/layouts/main.js';
import PostContent from './post-content.js';
import { graphql } from 'gatsby';


export default ({ data }) => {
  const post = data.post;
  const date = data.date.frontmatter.date;
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.metaDescription}>
      <Seo
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
            fluid(maxWidth: 1920) {
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
