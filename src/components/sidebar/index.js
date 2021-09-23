import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTachometerAlt,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

import { ROUTERS, NAVITEMS } from "configurations/routers"

const Sidebar = () => {
  const { pathname } = useLocation()

  const [selected, setSelected] = useState(ROUTERS.HOME)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (pathname === ROUTERS.HOME) {
      setSelected(ROUTERS.DASHBOARD)
    } else {
      setSelected(pathname)
    }
  }, [selected])

  const onCollapseHandler = () => {
    setCollapsed(!collapsed)
  }

  const generateNavItems = () =>
    NAVITEMS.map((data, index) => (
      <Link
        key={index}
        className={`sidebar-item flex${
          selected === data.to ? " sidebar-item-selected" : ""
        }`}
        to={data.to}
      >
        <FontAwesomeIcon icon={faTachometerAlt} />
        <span className={collapsed ? "sidebar-item-collapsed" : ""}>
          {data.name}
        </span>
      </Link>
    ))

  return (
    <nav
      className={`sidebar flex flex-column${
        collapsed ? " sidebar-collapsed" : " "
      }`}
    >
      <div className="sidebar-items flex flex-column">{generateNavItems()}</div>
      <div className="sidebar-collapse flex" onClick={onCollapseHandler}>
        <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
      </div>
    </nav>
  )
}

export default Sidebar
