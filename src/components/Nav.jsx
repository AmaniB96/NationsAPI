import { Link, useLocation } from 'react-router-dom';
import './nav.css';

export default function Nav() {
  const location = useLocation();

  return (
    <div className="nav">
      <div className="logo">
        <h3>Where in the world ?</h3>
      </div>

      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/quizz' ? 'active' : ''}>
          <Link to="/quizz">Quizz</Link>
        </li>
      </ul>

      <div className="dark-btn">
        <button className="darkmode">Dark</button>
      </div>
    </div>
  );
}
