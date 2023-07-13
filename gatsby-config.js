/* eslint-disable prettier/prettier */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config = require("./config/config");
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.title,
    titleTemplate: config.titleTemplate,
    description: config.description,
    image: config.image,
    siteLanguage: config.siteLanguage,
    author: config.author,
    mainUrl: config.siteUrl,
    siteUrl:
      activeEnv === "development"
        ? config.localUrl
        : `${config.siteUrl}${config.pathPrefix}`,
    canonical: config.canonical,
    twitterUsername: config.twitterUsername,
    keywords: config.keywords,
  },

  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        apiKey: process.env.API_KEY,
        trackingId: "G-WTT0CDWLRC",
        head: true,
        anonymize: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        autoGenHomeLabel: `Home`,
        exclude: [`/dev-404-page`, `/404`, `/404.html`],
        useClassNames: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images/`,
      },
    },
    {
      resolve: "gatsby-plugin-svgr-loader",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.title,
        short_name: config.shortName,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
        display: "standalone",
        scope: "/",
        start_url: "/",
        icon: config.favicon,
        icons: [
          {
            src: "/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
  ],
};