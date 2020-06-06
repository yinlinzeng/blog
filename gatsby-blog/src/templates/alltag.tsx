// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "../components/global.scss"

const $limit = 6

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark:{
    group:{
      totalCount: number
      fieldValue: string   
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const tags = data.allMarkdownRemark.group

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <div className="css-content"> 
        <section className="css-article"
          style={{
            maxWidth: `${rhythm(26)}`,
          }}
        >
          {tags.map(({ fieldValue,totalCount }) => <Link
          style={{
            float: `left`,
            margin:15,
          }}
          to={`/tag/`+ fieldValue}
          key={fieldValue}
          >{fieldValue}{`(`}{totalCount}{`)`}</Link>)}
        </section>
        <section className="css-slide"
          style={{
            maxWidth: `${rhythm(16)}`
          }}
        ><div>
          <div style={{
            textAlign: `center`
          }}>分类</div>
          <ul style={{textAlign:`center`}}>
            <li><Link to="/tag/coding">{`< `}技术分享{` />`}</Link></li>
            <li><Link to="/tag">{`< `}杂谈交流{` />`}</Link></li>
            <li><Link to="/tag/about">{`< `}关于我的{` />`}</Link></li>
          </ul>
        </div>
        </section>
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
      sort: { fields: [frontmatter___tags], order: DESC }
      limit: 1000
    ) {
      group ( field: frontmatter___tags ){
        totalCount
        fieldValue   
      }
    }
  }
`
