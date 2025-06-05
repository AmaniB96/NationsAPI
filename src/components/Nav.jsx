import { Link, useLocation } from 'react-router-dom';
import './nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faGlobe,faStar } from '@fortawesome/free-solid-svg-icons';  
export default function Nav() {
  const location = useLocation();

  return (
    <div className="nav">
      <div className="logo">
        <h3><FontAwesomeIcon icon={faGlobe} style={{color: "#FFD43B",}} /></h3>
      </div>
      <div className="ligne"></div>

      <ul className="navig">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/quizz' ? 'active' : ''}>
          <Link to="/quizz">Quizz</Link>
        </li>
      </ul>

      <div className="dark-btn">
        <button className="darkmode">  <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}}/></button>
      </div>
    </div>
  );
}
