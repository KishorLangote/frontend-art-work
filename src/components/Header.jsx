import { Link } from "react-router-dom";
import "../App.css";
const Header = ({ searchInput, setSearchInput }) => {
  return (
    <header>
      <nav className="bg-light">
        <div className="container-fluid py-3">
          <h1 className="mx-5">
            <Link className="nav-link fw-bold" to="/">
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
                className="icon-search py-4"
                placeholder="Search by gallery & continent..."
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
