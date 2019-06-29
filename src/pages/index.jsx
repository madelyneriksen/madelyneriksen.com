/* eslint-disable react/no-danger */
import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../common/layouts/main';
import Header from '../common/components/header';

const Index = ({ data }) => (
  <Layout
    title="Madelyn Eriksen -  Fullstack Python and React Developer in Los Angeles"
    description="I'm a developer writing about Python, Javascript, and frameworks like React."
  >
    <Header text="madelyn.eriksen()" subtitle="Web Development, from start to finish." />
    <section className="typography" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    <section className="typography">
      <h3>
        Latest Blog Posts
        <span role="img" aria-label=""> 📃 </span>
      </h3>
      <ul>
        {data.latestPosts.edges.map(({ node }) => (
          <li>
            <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
          </li>
        ))}
        <p><Link to="/blog/">View More Posts</Link></p>
      </ul>
    </section>
  </Layout>
);

Index.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  query {
    markdownRemark(frontmatter: {name: {eq: "homepage"}}) {
      html
      frontmatter {
        title
      }
    },
    latestPosts: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}},
      sort: {fields: [frontmatter___date], order: DESC},
      limit: 5,
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`;
