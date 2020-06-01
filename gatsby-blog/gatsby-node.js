const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// 页面创建函数
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  //查询md文件构建页面
  // 此处是用graphql查询
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
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

  //  创建博客贴文页面
  const posts = result.data.allMarkdownRemark.edges
  
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    // 生成单个页面函数
    createPage({
      path: post.node.fields.slug,//页面路径
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
