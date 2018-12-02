module.exports = {
  siteMetadata: {
    navbarLinks: [
      {to: "/", text: "HOME"},
      {to: "/about", text: "ABOUT"},
      {to: "https://github.com/madelyneriksen/", text: "PROJECTS"},
      {to: "/contact", text: "CONTACT"},
    ],
    sideBar: {
      links: [
        {to: "https://github.com/madelyneriksen/", text: "GITHUB"},
      ],
      bio: "This is a short author bio. Doloremque eos laboriosam eum ratione eos. Quibusdam praesentium optio iure molestiae.",
    },
    siteTitle: "madelyn eriksen",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      }
    },
  ]
}
