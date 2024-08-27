
import GetVenueList from "../api/venueListApi";
import heroImg from "../assets/img/heroImg.png";



function Home() {
  return (
    <div>
      <img src={heroImg} alt="home" />
      <h1>Discover the best retreats of Sri Lanka</h1>
      <GetVenueList />



    </div>
  );
}

export default Home;
