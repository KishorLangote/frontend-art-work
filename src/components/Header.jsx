import { Link } from "react-router-dom";
import "../App.css";
const Header = ({ OnSearch }) => {
  return (
    <header>
      <nav className="bg-light">
        <div className="container py-3">
          <h1>
            <Link className="nav-link" to="/">
              <i class="bi bi-brush" style={{ color: "purple" }}>
                Art Work
              </i>
            </Link>
          </h1>
          <span>
            <form
              className="d-flex justify-content-end border-light"
              role="search"
            >
              <input
                type="search"
                className="icon-search"
                placeholder="Search by title and tags.."
                aria-label="Search"
                onChange={OnSearch}
              />
            </form>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
