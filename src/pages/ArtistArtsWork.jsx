import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";

const ArtistArtsWork = () => {
  const { artistId } = useParams();
  console.log(artistId);

  const { data, loading, error } = useFetch(`https://backend-art-events.vercel.app/artEvents/${artistId}`);

  console.log(data);

  if (loading || error) {
    return (
      <div className="container py-5">
        {loading && <p>Loading...</p>}
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
      <Header />
      <div className="container py-4">
        <h1>Artist's Artwork</h1>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {data?.featuredArtists?.map((artist) => (
            artist?.artWorkImageUrl.map((art, index) => (
              <div
                key={index}
                className="col-md-4"
                style={{ 
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <div className="card mb-3">
                  <div className="card-body">
                    
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      style={{ width: '100%', height: '500px', objectFit: 'cover', flexWrap: 'wrap' }} className="mb-3"
                    />
                    <h3 className="text-center fw-medium">Title: {art.title}</h3>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtistArtsWork;
