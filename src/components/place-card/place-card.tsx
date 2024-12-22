import { JSX } from 'react';
import { Offer } from '../../types/offer.ts';
import { Link } from 'react-router-dom';
import { convertRating } from '../../utils.ts';

type PlaceCardProps = {
  place: Offer;
  activeId?: string | null;
  onHover?: (offerId: string | null) => void;
  variant: 'horizontal' | 'vertical';
}

function PlaceCard({ place, activeId, onHover, variant }: PlaceCardProps): JSX.Element {
  return (
    <article
      className = {
        activeId === place.id ?
          `${variant === 'horizontal' ? 'favorites__card' : 'cities__card'} place-card place-card--active` :
          `${variant === 'horizontal' ? 'favorites__card' : 'cities__card'} place-card`
      }
      onMouseEnter={() => onHover?.(place.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {place.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={
        `${variant === 'horizontal' ? 'favorites__image-wrapper' : 'cities__image-wrapper'}
        place-card__image-wrapper`
      }
      >
        <a href="#">
          <img
            className="place-card__image"
            src={place.previewImage}
            width={variant === 'horizontal' ? '150' : '260'}
            height={variant === 'horizontal' ? '110' : '200'}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${variant === 'horizontal' && 'favorites__card-info-wrapper'} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={place.isFavorite ?
              'place-card__bookmark-button place-card__bookmark-button--active button' :
              'place-card__bookmark-button button'}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
