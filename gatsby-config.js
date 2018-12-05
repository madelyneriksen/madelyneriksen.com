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
        {to: "/contact", text: "CONTACT ME"}
      ],
      bio: "This is a short author bio. Doloremque eos laboriosam eum ratione eos. Quibusdam praesentium optio iure molestiae.",
    },
    siteTitle: "madelyn.eriksen()",
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
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1400,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {},
          },
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Karla']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: "UA-130489047-1",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ['/success'],
        cookieDomain: "www.madelyneriksen.com",
      }
    }
  ]
}
