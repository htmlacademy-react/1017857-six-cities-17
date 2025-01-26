import { JSX } from 'react';
import { Offer } from '../../types/offer.ts';
import { Link } from 'react-router-dom';
import { convertRating } from '../../utils.ts';
import cn from 'classnames';
import BookmarkButton from '../bookmark-button/bookmark-button.tsx';

type PlaceCardProps = {
  place: Offer;
  activeId?: string | null;
  onHover?: (offerId: string | null) => void;
  variant: 'favorites' | 'cities' | 'near';
}

function PlaceCard({ place, activeId, onHover, variant }: PlaceCardProps): JSX.Element {
  return (
    <article
      className = {cn(
        { 'favorites__card': variant === 'favorites' },
        { 'cities__card': variant === 'cities' },
        { 'near-places__card': variant === 'near' },
        'place-card',
        { 'place-card--active': activeId === place.id }
      )}
      onMouseEnter={() => onHover?.(place.id)}
      onMouseLeave={() => onHover?.(null)}
    >

      {place.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={cn(
        { 'favorites__image-wrapper': variant === 'favorites' },
        { 'cities__image-wrapper': variant === 'cities' },
        { 'near-places__image-wrapper': variant === 'near' },
        'place-card__image-wrapper'
      )}
      >
        <a href="#">
          <img
            className="place-card__image"
            src={place.previewImage}
            width={variant === 'favorites' ? '150' : '260'}
            height={variant === 'favorites' ? '110' : '200'}
            alt="Place image"
          />
        </a>
      </div>
      <div className={cn(
        { 'favorites__card-info-wrapper': variant === 'favorites' },
        'place-card__info'
      )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton bookmarkClass={'place-card'} offerId={place.id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${convertRating(place.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>${place.title}</Link>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
