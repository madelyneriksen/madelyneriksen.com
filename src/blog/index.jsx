import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../common/layouts/main';
import Header from '../common/components/header';
import Preview from './preview';

const Index = ({ data, pageContext }) => (
  <Layout
    title={`All Posts - Page ${pageContext.pageNumber}`}
    description="All Blog Posts by Madelyn Eriksen."
  >
    <Header text={`All Posts - Page ${pageContext.pageNumber}`} />
    {data.posts.edges.map(({ node }) => (
      <Preview
        key={node.frontmatter.slug}
        excerpt={node.excerpt}
        slug={node.frontmatter.slug}
        title={node.frontmatter.title}
        category={node.frontmatter.category}
        image={node.frontmatter.postImage.childImageSharp.fluid}
        date={node.frontmatter.date}
      />
    ))}
  </Layout>
);

Index.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    nextPage: PropTypes.string.isRequired,
    pageNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export default Index;

export const blogListQuery = graphql`
  query posts($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}},
      sort: {fields: frontmatter___date, order: DESC},
      limit: $limit,
      skip: $skip,
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            category
            metaDescription
            slug
            postImage {
              childImageSharp {
                fluid(maxWidth: 1080, maxHeight: 512) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
