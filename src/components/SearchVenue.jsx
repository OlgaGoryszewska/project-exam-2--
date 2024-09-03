import { useEffect, useState } from "react";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function SearchVenue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);

  // First useEffect to fetch venues when the component mounts
  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setVenues(data.data); // Store all venues in state
        setFilteredVenues(data.data); // Initially show all venues
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    }

    fetchVenues();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Second useEffect to filter venues based on the search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredVenues(venues); // If search is empty, show all venues
    } else {
      const filtered = venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVenues(filtered); // Update the filtered list
    }
  }, [searchTerm, venues]); // Runs whenever searchTerm or venues changes

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Clear
          </button>
        )}
      </div>
      <ul className="mt-4">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <li key={venue.id} className="p-2 border-b border-gray-300">
              {venue.name}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No results found</li>
        )}
      </ul>
    </div>
  );
}

export default SearchVenue;
