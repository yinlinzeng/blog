// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const $limit = 6

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          tags: string[]
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="css-article">
        <h1>最近{$limit}篇</h1>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} >
              <header>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <div className="css-time">
                  <span className="iconfont icon-calendar2"></span>
                  <small className="css-date">{node.frontmatter.date}</small>
                  <span className="iconfont icon-label_fill"></span>
                  {node.frontmatter.tags
                    .map((tag,index)=>{
                      return (
                        <Link to={"/tag/"+ tag} className="css-tag" key={node.fields.slug + tag}>{tag}</Link>
                      )
                    })
                  }
                </div>
              </header>
              <section>
                <p className="css-desc"
                  style={{
                    marginBottom:`${rhythm(0.5)}`,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      limit: 6
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            tags
            title
            description
          }
        }
      }
    }
  }
`
