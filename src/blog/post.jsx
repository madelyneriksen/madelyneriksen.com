import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Seo from './seo';
import Layout from '../common/layouts/main';
import PostContent from './post-content';


const Post = ({ data }) => {
  const { post } = data;
  const { date } = data.date.frontmatter;
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.metaDescription}
    >
      <Seo
        title={post.frontmatter.title}
        image={post.frontmatter.postImage.childImageSharp.original.src}
        date={date}
        description={post.frontmatter.metaDescription}
        slug={post.frontmatter.slug}
      />
      <PostContent
        post={post.html}
        title={post.frontmatter.title}
        category={post.frontmatter.category}
        date={post.frontmatter.date}
        image={post.frontmatter.postImage.childImageSharp.fluid}
      />
    </Layout>
  );
};

Post.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object.isRequired,
};

export default Post;

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
`;
