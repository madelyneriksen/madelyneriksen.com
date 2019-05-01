import React from 'react';
import Layout from '../common/layouts/main';
import Header from '../common/components/header';
import Preview from '../blog/preview';
import { graphql } from 'gatsby';

export default ({ data }) => (
  <Layout
    title="Blog Index"
    description="I'm a developer writing about Python, Javascript, and frameworks like React.">
    <Header text="madelyn.eriksen()" subtitle="A programming blog by a hacker girl." />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Preview
        excerpt={node.excerpt}
        slug={node.frontmatter.slug}
        title={node.frontmatter.title}
        category={node.frontmatter.category}
        image={node.frontmatter.postImage.childImageSharp.fluid}
        date={node.frontmatter.date}
      />
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}},
      sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          html
          excerpt(format: HTML, pruneLength: 255)
          frontmatter {
            slug
            title
            category
            date(formatString: "MMM Do, YYYY")
            postImage {
              childImageSharp {
                fluid(maxWidth: 1080) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
