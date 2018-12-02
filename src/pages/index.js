import React from 'react';
import Layout from '../common/layouts/main.js';
import Preview from '../blog/preview.js';
import { graphql } from 'gatsby';

export default ({ data }) => (
  <Layout>
    <div className="flex flex-wrap flex-column">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Preview
          excerpt={node.frontmatter.excerpt}
          slug={node.frontmatter.slug}
          title={node.frontmatter.title}
        />
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "post"}}}) {
      edges {
        node {
          html
          frontmatter {
            slug
            title
            excerpt
          }
        }
      }
    }
  }
`
