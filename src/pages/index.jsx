/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../common/layouts/main';
import Header from '../common/components/header';

const Index = ({ data }) => (
  <Layout
    title="Madelyn Eriksen -  Fullstack Python and React Developer in Los Angeles"
    description="I'm a developer writing about Python, Javascript, and frameworks like React."
  >
    <Header text="madelyn.eriksen()" subtitle="A programming blog by a hacker girl." />
    <section className="typography" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
    }
  }
`;
