import GetVenueList from "../api/venueList";
import heroImg from "../assets/img/heroImg.png";
import SearchVenue from "../components/SearchVenue";  

function Home() {
  return (
    <div className="flex flex-col">
      <img className="max-h-800  object-cover " src={heroImg} alt="home" />
      <div className="flex flex-col max-w-4xl mx-auto ">
        <h1 className="text-center p-4 ">
          Discover the best retreats of Sri Lanka
        </h1>
        <SearchVenue />

        <GetVenueList />
      </div>
    </div>
  );
}

export default Home;
