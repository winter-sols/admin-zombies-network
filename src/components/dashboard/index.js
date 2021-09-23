import "./style.scss"

import Navbar from "components/navbar"
import Sidebar from "components/sidebar"
import Main from "components/main"

const Dashboard = ({
  info,
  errors,
  onLogoutHandler,
  handleSubmit,
  onChangeHandler,
}) => (
  <div className="dashboard flex flex-column">
    <Navbar className="dashboard-navbar" onLogoutHandler={onLogoutHandler} />
    <div className="dashboard-wrapper flex">
      <Sidebar />
      <Main
        info={info}
        errors={errors}
        handleSubmit={handleSubmit}
        onChangeHandler={onChangeHandler}
      />
    </div>
  </div>
)

export default Dashboard
