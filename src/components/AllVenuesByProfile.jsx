import { fetchAllVenuesByProfile } from '../services/fetchAllVenuesByProfile';
import { useEffect, useState } from 'react';
import { loadLocalStorage } from '../storage/loadLocalStorage';
import StarRating from './RatingStars';
import { deleteVenue } from '../services/deleteVenue';
import { UpdateVenueForm } from './UpdateVenueForm';
import { formatDate } from '../utils/formatDate';
import Venue from '../assets/img/venuePng.png';

// Icons
import DeckIcon from '@mui/icons-material/Deck';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export function AllVenuesByProfile() {
  const [venues, setVenues] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showManagedVenues, setShowManagedVenues] = useState(false);

  useEffect(() => {
    const profile = loadLocalStorage('profile');
    const profileName = profile ? profile.name : '';
    const accessToken = loadLocalStorage('token');

    fetchAllVenuesByProfile(profileName, accessToken)
      .then((data) => {
        console.log('data', data);
        setVenues(data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleDelete = (id) => {
    const accessToken = loadLocalStorage('token');

    deleteVenue(id, accessToken)
      .then(() => {
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting venue:', error);
      });
  };

  return (
    <>
      <div
        onClick={() => setShowManagedVenues(!showManagedVenues)}
        className="card hover:border border-rav-mango flex justify-between"
      >
        <div className="card-home-page m-4 mb-0 ">
          <DeckIcon />
          <p className="text-base font-medium mx-2 mb-4  ">
            Venues you manage
          </p>
        </div>
        <KeyboardArrowDownIcon
          className={`m-4 hover:text-rav-mango transform transition-transform duration-200 ${
            showManagedVenues ? 'rotate-180' : ''
          }`}
        />
      </div>
      {showManagedVenues && (
        <div className="list-of-venues">
          {venues &&
            venues.map((venue) => (
              <div className="card " key={venue.id}>
                {venue.media && venue.media.length > 0 ? (
                  venue.media.map((mediaItem, index) => (
                    <img
                      key={index}
                      src={mediaItem.url}
                      alt={mediaItem.alt || 'Venue image'}
                      className="venue-image "
                    />
                  ))
                ) : (
                  <img
                    src={Venue}
                    alt="missing img"
                    className="venue-image"
                  />
                )}
                <h2 className="mx-4">{venue.name}</h2>
                <p className="px-4 font-light">{venue.description}</p>

                <div className="border border-dashed border-dark-coconut m-4 ">
                  {venue.bookings && venue.bookings.length > 0 ? (
                    <div>
                      <h3>Bookings:</h3>
                      {venue.bookings.map((booking, index) => (
                        <div
                          key={index}
                          className=" border-t border-dashed border-pink-silk p-4"
                        >
                          <div className="flex flex-col">
                            <div className="flex flex-row ">
                              {booking.customer.avatar && (
                                <img
                                  src={booking.customer.avatar.url}
                                  alt={
                                    booking.customer.avatar.alt ||
                                    'Customer avatar'
                                  }
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                              )}
                              <h4 className="my-auto">
                                {booking.customer.name}
                              </h4>
                            </div>
                            <p>
                              <strong>From:</strong>{' '}
                              {formatDate(booking.dateFrom)}{' '}
                              <strong>To:</strong>{' '}
                              {formatDate(booking.dateTo)}
                            </p>
                            <p>
                              <strong>Guests:</strong> {booking.guests}
                            </p>

                            <p>
                              {' '}
                              <strong>Email:</strong>{' '}
                              {booking.customer.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center ">
                      <ThumbDownOffAltIcon
                        fontSize="large"
                        className="mt-4"
                      />
                      <p className="p-4 text-center">
                        It seems like you have no bookings yet for this
                        venue!
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row justify-between py-3 border-t border-pink-silk border-dashed m-4 pb-0">
                  <div>
                    <StarRating rating={venue.rating} />
                  </div>

                  <p>{venue.price} $/Per Night</p>
                </div>
                <div className="flex flex-row justify-between px-4 pb-4">
                  <button
                    onClick={() => {
                      setShowUpdateForm(!showUpdateForm);
                    }}
                    className="button-blue w-28"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="button-blue w-28"
                  >
                    Delete
                  </button>
                </div>
                <div>
                  {showUpdateForm && <UpdateVenueForm id={venue.id} />}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
