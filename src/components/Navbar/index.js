import "./style.scss"

const Navbar = ({ onLogoutHandler }) => {
  return (
    <div className="navbar flex">
      <div className="navbar-header">ZOMBIES NETWORK ADMIN</div>
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  )
}

export default Navbar
