import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "./global.scss"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let style

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.2),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
    style  = {
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(42),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );
    style  = {
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(34),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }

  }
  return (
    <div
      style={style}
    >
      <header
        className='css-header'
      >
        {header}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
