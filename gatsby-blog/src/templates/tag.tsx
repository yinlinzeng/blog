// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../components/global.scss"


const BlogIndex = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { totalPage, currentPage,tag } = pageContext


  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <section>
        <section style={{maxWidth: `${rhythm(28)}`,float:`left`}} >
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
                  <span className="iconfont icon-calendar2"></span>
                  <small className="css-date">{node.frontmatter.date}</small>
                  <span className="iconfont icon-label_fill"></span>
                  {node.frontmatter.tags
                    .map((tag,index)=>{
                      return (
                        <Link to="/" className="css-tag" key={node.fields.slug + tag}>{tag}</Link>
                      )
                    })
                  }
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
        </section>
        <section className="css-slide"
          style={{
            maxWidth: `${rhythm(12)}`,
            float:`left`
          }}
        ><div>
          <div style={{
            textAlign: `center`
          }}>分类</div>
          <ul style={{textAlign:`center`}}>
            <li><Link to="/tag/">{`< `}标签{` />`}</Link></li>
            <li><Link to="/tag/coding">{`< `}技术{` />`}</Link></li>
            <li><Link to="/tag/life">{`< `}生活{` />`}</Link></li>
            <li><Link to="/tag/translation">{`< `}翻译{` />`}</Link></li>
          </ul>
        </div>
        </section>
      </section>
      <div style={{
        width:1000,
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
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          description
        }
      }
    }
  }
}
`
