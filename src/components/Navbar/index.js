import "./style.scss"

const Navbar = ({ clickHandler }) => {
  return (
    <div className="navbar">
      <button onClick={clickHandler} className="btn btn-warning navbar-logout">
        Logout
      </button>
    </div>
  )
}

export default Navbar
