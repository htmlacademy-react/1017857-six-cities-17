import Image from '../image/image.tsx';
import { OfferExtended } from '../../types/offer.ts';
import { convertRating } from '../../utils.ts';
import WhatInside from '../what-inside/what-inside.tsx';
import OfferHost from '../offer-host/host.tsx';
import Reviews from '../reviews/reviews.tsx';
import { Review } from '../../types/review.ts';
import Map from '../map/map.tsx';

type OfferCardProps = {
  currentOffer: OfferExtended;
  reviewsData: Review[];
}

function OfferCard({ currentOffer, reviewsData }: OfferCardProps) {
  const currentReviews = reviewsData.filter((review) => currentOffer.reviews?.includes(review.id));
  return (
    <section className="offer">
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
            <button
              className={currentOffer.isFavorite ?
                'offer__bookmark-button offer__bookmark-button--active button' :
                'offer__bookmark-button button'}
              type="button"
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
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
              {currentOffer.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {currentOffer.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{currentOffer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <WhatInside goods={currentOffer.goods} />
          <OfferHost host={currentOffer.host} />
          <Reviews reviewsData={currentReviews} />
        </div>
      </div>
      <Map />
    </section>
  );
}

export default OfferCard;
