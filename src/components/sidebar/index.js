import "./style.scss"
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul>
      <li><Link to="/">Dashboard</Link></li>
    </ul>
  )
}

export default Sidebar
