import Image from '../image/image.tsx';
import { City, Offer, OfferExtended } from '../../types/offer.ts';
import { convertRating } from '../../utils.ts';
import WhatInside from '../what-inside/what-inside.tsx';
import OfferHost from '../offer-host/host.tsx';
import Reviews from '../reviews/reviews.tsx';
import { Review } from '../../types/review.ts';
import Map from '../map/map.tsx';
import { useAppSelector } from '../../hooks';
import { getCity, getPlaces } from '../../store/places-process/selectors.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import BookmarkButton from '../bookmark-button/bookmark-button.tsx';

type OfferCardProps = {
  currentOffer: OfferExtended;
  reviewsData: Review[];
  neighbourhoods: Offer[];
}

function OfferCard({ currentOffer, reviewsData, neighbourhoods }: OfferCardProps) {
  const city: City = useAppSelector(getCity);
  const offers: Offer[] = useAppSelector(getPlaces);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const current: Offer | undefined = offers.find((offer) => offer.id === currentOffer.id);
  let places: Offer[] | null = [];
  if (current) {
    places = [...neighbourhoods, current];
  }
  return (
    <section className="offer">
      {current ?
        <>
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image: string) => (
                <Image
                  key={image}
                  src={image}
                  alt={currentOffer.title}
                />
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <BookmarkButton bookmarkClass={'offer'} offerId={current?.id}/>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${convertRating(currentOffer.rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms > 1 ? `${currentOffer.bedrooms} Bedrooms` : `${currentOffer.bedrooms} Bedroom` }
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults > 1 ? `${currentOffer.maxAdults} Adults` : `${currentOffer.maxAdults} Adult`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <WhatInside goods={currentOffer.goods}/>
              <OfferHost host={currentOffer.host}/>
              <Reviews authorizationStatus={authorizationStatus} reviewsData={reviewsData}/>
            </div>
          </div>
          <Map
            city={city.location}
            points={places}
            selectedPointId={currentOffer.id}
            variant={'offer'}
          />
        </>
        : ''}
    </section>
  );
}

export default OfferCard;
