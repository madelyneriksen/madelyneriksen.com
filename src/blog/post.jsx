import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Seo from './seo';
import Layout from '../common/layouts/main';
import PostContent from './post-content';


const Post = ({ data }) => {
  const { post } = data;

  const {
    metaDescription,
    title,
    postImage,
    slug,
    date,
    category,
  } = post.frontmatter;

  return (
    <Layout
      title={title}
      description={metaDescription}
    >
      <Seo
        title={title}
        image={postImage && postImage.childImageSharp.original.src}
        date={date}
        description={metaDescription}
        slug={slug}
      />
      <PostContent
        post={post.html}
        title={title}
        category={category}
        date={date}
        image={postImage}
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
              ...GatsbyImageSharpFluid_withWebp
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
