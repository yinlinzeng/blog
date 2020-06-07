import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "./global.scss"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let style
  let css_slide
  let css_content
  let slide
  let article_num
  let slide_num

  // 计算日期
  let days = (() => {
    let stime = new Date("2020-06-07 15:41:53").getTime()
    let etime = new Date().getTime()
    let days = parseInt((etime - stime) / (1000 * 3600 * 24))
    return days
  })()

  if (
    location.pathname === rootPath ||
    location.pathname.indexOf("tag") != -1
  ) {
    header = (
      <h4
        style={{
          ...scale(0),
          fontSize: `1.5rem`,
          letterSpacing: `0.05rem`,
          marginTop: 0,
          marginBottom: `${rhythm(0.2)}`,
        }}
      >
        <Link to={`/`}>{title}</Link>
      </h4>
    )
    style = {
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(40),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }
    css_content = "css-content"
    css_slide = "css-slide"
    slide = (
      <div>
        <div>分类</div>
        <ul>
          <li>
            <Link to="/tag/">
              {`< `}标签{` />`}
            </Link>
          </li>
          <li>
            <Link to="/tag/coding">
              {`< `}技术{` />`}
            </Link>
          </li>
          <li>
            <Link to="/tag/life">
              {`< `}生活{` />`}
            </Link>
          </li>
          <li>
            <Link to="/tag/translation">
              {`< `}翻译{` />`}
            </Link>
          </li>
        </ul>
      </div>
    )
    article_num = rhythm(26)
    slide_num = rhythm(14)
  } else {
    header = (
      <h4
        style={{
          fontSize: `1.5rem`,
          letterSpacing: `0.05rem`,
          marginTop: 0,
          marginBottom: `${rhythm(0.2)}`,
        }}
      >
        <Link to={`/`}>{title}</Link>
      </h4>
    )
    style = {
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(34),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }
    css_slide = null
    css_content = "css-post"
    css_slide = null
    article_num = rhythm(36)
  }
  return (
    <div style={style}>
      <header className="css-header">{header}</header>
      <main className={css_content}>
        <article style={{ maxWidth: article_num }}>{children}</article>
        <slide className={css_slide} style={{ maxWidth: slide_num }}>
          {slide}
        </slide>
      </main>
      <footer className="css-footer">
        <p>© 2020-{new Date().getFullYear()} 伍拾叁</p>
        <p>
          {" "}
          一转眼 已经过了 <strong>{days}</strong> 天
        </p>
        <p>
          power by{" "}
          <a href="https://www.gatsbyjs.org/" target="_blank" rel="noreferrer">
            Gatsby
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
