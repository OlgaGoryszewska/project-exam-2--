import { useState, useEffect } from 'react';
import Venue from '../assets/img/venue.png';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const url = 'https://v2.api.noroff.dev/holidaze/venues';

function GetVenueList() {
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    async function fetchVenueList() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVenueList(data.data); 
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
            <div key={venue.id} className="venue-item">
              <h2>
                {venue.name}
              </h2>
              {venue.media && venue.media.length > 0 ? (
                venue.media.map((mediaItem, index) => (
                  <img 
                    key={index}
                    src={mediaItem.url} 
                    alt={mediaItem.alt || 'Venue Image'} 
                    className="venue-image"
                  />
                ))
              ) : (
                <img 
                src={Venue} 
                alt="missing img" 
                className="venue-image"
                />
              )}
              <PeopleAltIcon  />
            </div>
          ))
        ) : (
          <p>Loading venues...</p>
        )}
      </div>
    );
}

export default GetVenueList;
