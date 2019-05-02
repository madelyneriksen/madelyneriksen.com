import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../common/layouts/main';
import AboutContent from '../about/about-content';


const About = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout
      title="About Me"
      description="Madelyn Eriksen is a Javascript, Python, and React developer from Los Angeles. She builds data-driven applications for e-commerce and analytics."
    >
      <div className="bg-white mv2" style={{ gridArea: 'content' }}>
        <AboutContent
          post={post.html}
          title={post.frontmatter.title}
          image={post.frontmatter.postImage.childImageSharp.fluid}
        />
      </div>
    </Layout>
  );
};

About.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object,
};

export default About;

export const query = graphql`
  query {
    markdownRemark(frontmatter: {name: {eq: "about"}}) {
      html
      frontmatter {
        title
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
`;
