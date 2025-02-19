import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import ArtistArtsWork from "./ArtistArtsWork";

const ArtEventDetails = () => {
  const { id } = useParams();
  console.log("id:", id);


  const { data: artEventData, loading, error } = useFetch(`https://backend-art-events.vercel.app/artEvents/${id}`);

  console.log("Data:", artEventData);

  if (loading || error) {
    return (
      <div className="container py-5">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    );
  }

  if (!artEventData) {
    return (
      <div className="container py-5">
        <p>No art event data.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container bg-light">
        <h1>{artEventData.title}</h1>
        <div className="row justify-content-between">
          <div className="col-6">
            <h3 className="mb-0 fw-bold">Hosted By:</h3>
            <p className="mb-0">
              {artEventData.hostBy.map((tag, index) => (
                <span
                  key={index}
                  className="badge text-bg-primary rounded ms-0 m-4 fs-5 p-2"
                >
                  {tag}
                </span>
              ))}
            </p>
            <div className="">
              <img
                src={artEventData.hostImageUrl}
                alt={artEventData.title}
                style={{ width: "100%", height: "400px", border: "3px solid black" }}
                className="p-1 rounded img-fluid"
              />
            </div>
            <h4 className="mt-3 fw-bold">Descriptions: </h4>
            <p className="mb-3">{artEventData.descriptions}</p>
            <h4 className="fw-bold">Additional Information:</h4>
            <div className="fs-5">
              <p>
                <strong>Artist Count: </strong>
                {artEventData.artistCount}
              </p>
              <p>
                <strong>Entry Fee:</strong> {artEventData.entryFee}
              </p>
              <p>
                <strong>Maximum Capacity:</strong> {artEventData.maxCapacity}
              </p>
              <p>
                <strong>Ticket is Available: </strong>
                {artEventData.ticketsAvailable === true ? "Yes" : "No"}
              </p>
              <p>
                <strong>Check Tickets Availability: </strong>
                <Link
                  to={artEventData.officialWebsite}
                  className="btn btn-info p-2 fw-bold text-light fw-bold"
                >
                  Visit Our Website
                </Link>
              </p>
            </div>
            <h4 className="mb-0 fw-bold">Event Tags:</h4>
            <p>
              {artEventData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge tag-bg-color rounded ms-0 m-4 fs-5 p-2"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>

          <div className="col-6 py-4">
            <div className="card mb-3 border-light">
              <div className="card-body">
                <h4 className="text-center fw-bold">
                  <i
                    class="bi bi-calendar2-event-fill mx-2"
                    style={{ fontSize: "20px" }}
                  ></i>{" "}
                  Event Details
                </h4>
                <div className="text-center">
                  <p>
                    <i
                      class="bi bi-stopwatch-fill mx-2"
                      style={{ fontSize: "20px" }}
                    ></i>
                    {artEventData.startEvent} {artEventData.date} to{" "}
                    {artEventData.endEvent} {artEventData.date}
                  </p>
                  <p>
                    <i
                      class="bi bi-geo-alt-fill mx-2"
                      style={{ fontSize: "20px" }}
                    ></i>
                    {artEventData.address}
                  </p>
                  <p>
                    {artEventData.sponsors.map((tag, index) => (
                      <span
                        key={index}
                        className="badge text-bg-warning text-light rounded ms-0 m-4 fs-4 p-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="card mb-3 border-light">
                <div className="card-body">
                  <h4 className="text-center fw-bold">Artist Details</h4>
                  <div className="  ">
                    {artEventData.featuredArtists.map((artist) => (
                      <div className="text-center" key={artist._id}>
                        <img
                          src={artist.imageUrl}
                          style={{
                            width: "30%",
                            height: "10rem",
                            borderRadius: "rounded",
                            border: '4px solid black'
                          }}
                          className="rounded-circle"
                        />
                        <p className="mt-2 fw-bold fs-5">
                          <i
                            class="bi bi-palette-fill mx-2"
                            style={{ fontSize: "20px" }}
                          ></i>
                          {artist.name}
                        </p>
                        <p>{artist.bio}</p>
                        <p>Click here to see his/her art work.</p>
                        <Link
                          className="btn btn-primary fw-bold"
                          to={`/artEvents/artists/${artEventData._id}/arts`}
                        >
                          View Art Work
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ArtEventDetails;
