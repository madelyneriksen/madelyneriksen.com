import React from 'react';
import 'tachyons';
import Layout from '../common/layouts/main.js';
import Container from '../common/containers/text-container.js';
import { graphql } from 'gatsby';


export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div className="bg-white mv2" style={{gridArea: "content"}}>
        <Container>
          <div dangerouslySetInnerHTML={{__html: post.html }} />
        </Container>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
    }
  }
`
