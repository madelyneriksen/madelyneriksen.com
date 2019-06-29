const path = require('path');

exports.createPages = ({ graphql, actions}) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allPosts: allMarkdownRemark(
            filter: {frontmatter: {type: {eq: "post"}}},
            sort: {fields: frontmatter___date, order: DESC},
            ) {
              edges {
                node {
                  frontmatter {
                    slug
                  }
                }
              }
              group(field: frontmatter___category) {
                fieldValue
                edges {
                  node {
                    frontmatter {
                      slug
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        const allPosts = result.data.allPosts.edges;

        // Eventually will use this for category pages.
        const groupedPosts = result.data.allPosts.group;

        const paginationTemplate = path.resolve('src/blog/index.jsx');
        const postsPerPage = 5;
        let numPages = Math.ceil(allPosts.length / postsPerPage);

        // Creating the main blog index
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/blog' : `/blog/${i + 1}`,
            component: paginationTemplate,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              nextPage: `/blog/${i + 2}`,
              pageNumber: i + 1,
            }
          })
        })
      })
    )
  })
}
