import { useState, useEffect } from 'react';

const url = 'https://v2.api.noroff.dev/holidaze/venues';

function GetVenueList() {
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    async function fetchVenueList() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVenueList(data.data); // Assuming the array of venues is in `data.data`
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    }
    fetchVenueList();
  }, []);

  return (
    <div className='mx-4'>
      {venueList.length > 0 ? (
        venueList.map((venue) => (
          <div key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            {venue.media && venue.media.length > 0 ? (
              venue.media.map((mediaItem, index) => (
                <img 
                  key={index}
                  src={mediaItem.url} 
                  alt={mediaItem.alt || 'Venue Image'} 
                  className="w-full h-auto my-4"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading venues...</p>
      )}
    </div>
  );
}

export default GetVenueList;
