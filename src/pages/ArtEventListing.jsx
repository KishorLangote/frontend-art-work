import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ArtEventListing = () => {
  const [filterContinent, setFilterContinent] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const { data, loading, error } = useFetch(
    "https://backend-art-events.vercel.app/artEvents"
  );
  console.log("Data:", data);

  const filteredContinent = data?.filter((artEvent) => {
    const matchesContinent =
      filterContinent === "All" || artEvent.continent === filterContinent;

    // search by gallery name..

    const matchesArtGallery = artEvent?.artGalleryName
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    // search by continent:

    const searchByContinent = artEvent?.continent
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    // keep art events that match the both conditions and render the filtered data..
    return matchesContinent && (matchesArtGallery || searchByContinent);
  });

  console.log(filteredContinent);

  const handlerContinent = (e) => {
    setFilterContinent(e.target.value);
  };

  if (loading || error) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: "50vh"}}>
        <div className="spinner-border text-primary mt-5 mx-4"></div>
        {loading && <p className="fs-5">Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container py-5">
        <p>No art event data.</p>
      </div>
    );
  }

  return (
    <>
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <main className="container py-4 bg-light">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h1>Art Events</h1>
            </div>

            <div className="py-3 d-flex">
              <label className="my-3 mx-3 fw-medium">Continent:</label>
              <select
                className="form-control form-select"
                value={filterContinent}
                onChange={handlerContinent}
              >
                <option value="All">All</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
              </select>
            </div>
          </div>

          <div className="row">
            {filteredContinent.map((event) => (
              <div key={event._id} className="col-md-4">
                <div className="card mb-5 mx-2 border-light p-2">
                  <div className="position-relative">
                    <Link to={`/artEvents/${event._id}`}>
                      <img
                        src={event.eventImageUrl}
                        alt={event.title}
                        className="card-img mb-3 py-"
                        style={{
                          cursor: "pointer",
                          width: "100%",
                          height: "15rem",
                        }}
                      />
                    </Link>
                    <span
                      className="position-absolute start-0 bg-info text-light px-2 p-2 rounded fw-bold"
                      style={{ margin: "15px", fontFamily: "serif" }}
                    >
                      {event.continent}
                    </span>
                  </div>

                  <span>
                    <h3 className="p-">{event.artGalleryName}</h3>
                  </span>
                  <span className="fw-bold">
                    Date: {event.date}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                  </span>
                  <p className="card-text">
                    <small className="text-body-secondary fw-medium">
                      {event.continent}, {event.country}, {event.city}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-geo-alt"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArtEventListing;
