import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-item nav-link active" : "nav-item nav-link"
                }
                to="/"
              >
                Главная страница
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-item nav-link active" : "nav-item nav-link"
                }
                to="films"
              >
                Список фильмов
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-item nav-link active" : "nav-item nav-link"
                }
                to="menu"
              >
                Главное меню
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-item nav-link active" : "nav-item nav-link"
                }
                to="predict"
              >
                Ваши предикты
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
