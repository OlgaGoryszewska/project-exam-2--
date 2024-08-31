import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Venue from "../assets/img/venue.png";

//Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PublicIcon from '@mui/icons-material/Public';

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
      <div>
        {venueById.media && venueById.media.length > 0 ? (
          <>
            {venueById.media.map((mediaItem, index) => (
              <div key={index}>
                <img
                  src={mediaItem.url}
                  alt={mediaItem.alt || "Venue Image"}
                  className="venue-image"
                />
                <h2>{venueById.name}</h2>
                <div>
                  <div className="card-home-page">
                    <PeopleAltIcon className="venue-icon" />
                    <p>{venueById.maxGuests} Guests </p>
                  </div>
                  <div className="card-home-page">
                    <WifiIcon className="venue-icon" />
                    <p>{venueById.meta.wifi ? "Available" : "Not Available"}</p>
                  </div>
                  <div className="card-home-page">
                    <BakeryDiningIcon className="venue-icon" />
                    <p>
                      {venueById.meta.breakfast ? "Breakfast" : "Not Available"}
                    </p>
                  </div>
                  <div className="card-home-page">
                    <PetsIcon className="venue-icon" />
                    <p>
                      {venueById.meta.pets ? "Pets Aloud" : "Pets Not Aloud"}
                    </p>
                  </div>
                  <div className="card-home-page">
                    <LocalParkingIcon className="venue-icon" />
                    <p>
                      {venueById.meta.parking ? "Parking" : "No Parking"}
                    </p>
                  </div>
                  <div className="card-home-page">
                    <PlaceOutlinedIcon className="venue-icon" />
                    <p>{venueById.city ? venueById.city : "Colombo"}</p>
                  </div>
                  <div className="card-home-page">
                    <PublicIcon className="venue-icon" />
                    <p>
                      {venueById.meta.parking ? "Parking" : "No Parking"}
                    </p>
                  </div>
                </div>
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
