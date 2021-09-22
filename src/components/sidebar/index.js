import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <nav className="bd-links" id="bd-docs-nav" aria-label="Docs navigation">
      <ul className="list-unstyled mb-0 py-3 pt-md-1">
        <li className="mb-1">
          <Link className="btn d-inline-flex align-items-center rounded" to="/">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
