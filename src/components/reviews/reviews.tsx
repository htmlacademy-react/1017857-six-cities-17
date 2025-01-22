import ReviewForm from '../review-form/review-form.tsx';
import { JSX } from 'react';
import ReviewItem from '../review-item/review-item.tsx';
import { Review } from '../../types/review.ts';
import { AuthorizationStatus, Setting } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { getOfferData } from '../../store/offer-process/selectors.ts';

type ReviewsProps = {
  reviewsData?: Review[];
  authorizationStatus: AuthorizationStatus;
}

function Reviews({ reviewsData, authorizationStatus }: ReviewsProps): JSX.Element {
  const displayedReviews = reviewsData ? reviewsData.slice(-Setting.MaxReviews).reverse() : [];
  const offerData = useAppSelector(getOfferData);
  const offerId = offerData ? offerData.id : null;
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsData ? reviewsData.length : 0}</span></h2>
      {reviewsData &&
        <ul className="reviews__list">
          {displayedReviews.map((review) => (
            <ReviewItem
              key={review.id}
              comment={review.comment}
              date={review.date}
              rating={review.rating}
              user={review.user}
            />
          ))}
        </ul>}
      {(authorizationStatus === AuthorizationStatus.Auth && offerId !== null) && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default Reviews;
