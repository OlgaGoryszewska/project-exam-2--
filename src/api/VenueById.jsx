import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Venue from "../assets/img/venue.png";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function VenueById() {
  const [venueById, setVenueById] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchVenueById() {
      try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVenueById(data.data);
        document.title = `${data.data.name}`;
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    }

    if (id) {
      fetchVenueById();
    }
  }, [id]);

  if (!venueById) {
    return <p>Venue not available to be viewed</p>;
  }

  return (
    <div>
      <div>
        <p>{venueById.created}</p>
        <p>{venueById.updated}</p>

      </div>
      <div className="card">
      <h2>{venueById.name}</h2>
      {venueById.media && venueById.media.length > 0 ? (
        <>
          {venueById.media.map((mediaItem, index) => (
            <div key={index}>
              <img
                src={mediaItem.url}
                alt={mediaItem.alt || "Venue Image"}
                className="venue-image"
              />
            </div>
          ))}
          
        </>
      ) : (
        <>
          <div>
            <img src={Venue} alt="missing img" className="venue-image" />
          </div>
        </>
      )}
    </div>
    </div>
    
  );
}

export default VenueById;
