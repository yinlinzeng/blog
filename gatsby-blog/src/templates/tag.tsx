// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
// import "../components/global.scss"


const BlogIndex = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { totalPage, currentPage,tag } = pageContext


  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div style={{maxWidth: `${rhythm(26)}`}} >
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} >
              <header>
                <h3
                  style={{
                    marginTop: 20,
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
              <section className="">
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
      <div style={{
        clear: `both`
      }}></div>
      <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <div>
            {currentPage - 1 > 0 && (
              <Link
                to={`/tag/${tag}/` + (currentPage - 1 === 1 ? '' : currentPage - 1)}
                rel="prev"
              >
                ← 上一页
              </Link>
            )}
          </div>
          <div>
            {currentPage + 1 <= totalPage && (
              <Link to={`/tag/${tag}/` + (currentPage + 1)} rel="next">
                下一页 →
              </Link>
            )}
          </div>
        </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
query($tag: String!, $skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: {tags: {in: [$tag]}}}
    limit: $limit
    skip: $skip 
  ) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          tags
          description
        }
      }
    }
  }
}
`
