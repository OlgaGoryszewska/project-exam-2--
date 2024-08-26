//import { API_BASE_URL } from "./config";
import { useEffect, useState } from "react";


function VenueListApi() {
  const [venueList, setVenueList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenueList() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/api/venues");
        const data = await response.json();
        setVenueList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchVenueList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      <h1>Venue List</h1>
      <ul>
        {venueList.map((venue) => (
          <li key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )


}

export default VenueListApi;

