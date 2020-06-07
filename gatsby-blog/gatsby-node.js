const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// 页面创建函数
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const homePaginate = path.resolve(`./src/templates/paginate.tsx`)
  const tagTemplate = path.resolve(`./src/templates/tag.tsx`)
  const alltagTemplate = path.resolve(`./src/templates/alltag.tsx`)
  //查询md文件构建页面
  // 此处是用graphql查询
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const tags = result.data.allMarkdownRemark.group
  const posts = result.data.allMarkdownRemark.edges

  // 创建主页分页器
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: homePaginate,
      context: {
        currentPage: i + 1,
        totalPage: numPages,
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    })
  })

  // 创建标签页面
  if (tags != undefined) {
    tags.forEach(tag => {
      const total = tag.totalCount
      const numPages = Math.ceil(total / postsPerPage)
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path:
            i === 0
              ? `/tag/${tag.fieldValue}`
              : `/tag/${tag.fieldValue}/${i + 1}`,
          component: tagTemplate,
          context: {
            tag: tag.fieldValue,
            currentPage: i + 1,
            totalPage: numPages,
            limit: postsPerPage,
            skip: i * postsPerPage,
          },
        })
      })
    })
    createPage({
      path: `/tag`,
      component: alltagTemplate,
    })
  }
  // console.log(tags);
  //  创建博客贴文页面
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    // 生成单个页面函数
    createPage({
      path: post.node.fields.slug, //页面路径
      component: blogPost, //页面使用的模板
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

// 节点创建函数
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
