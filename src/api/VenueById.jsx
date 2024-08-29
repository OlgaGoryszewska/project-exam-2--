import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const url = 'https://v2.api.noroff.dev/holidaze/venues';

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
    return <p>we are on the wayyyyy</p>; 
  }

  return (
    <div>
      <h1>{venueById.name}</h1>
    </div>
  );
}

export default VenueById;
