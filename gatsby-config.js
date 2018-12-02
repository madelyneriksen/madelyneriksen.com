module.exports = {
  siteMetadata: {
    navbarLinks: [
      {to: "/", text: "HOME"},
      {to: "/about", text: "ABOUT"},
      {to: "https://github.com/madelyneriksen/", text: "PROJECTS"},
      {to: "/contact", text: "CONTACT"},
    ],
    sideBar: {
      links: [],
      bio: "",
    },
    siteTitle: "madelyn eriksen",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
  ]
}
