// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
// import "../components/global.scss"

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
      <div className="css-content"> 
        <section className="css-article"
          style={{
            float: `left`
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
