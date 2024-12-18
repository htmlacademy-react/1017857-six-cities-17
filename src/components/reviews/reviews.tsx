import ReviewForm from '../review-form.tsx';
import { JSX, useState } from 'react';
import ReviewItem from '../review-item/review-item.tsx';
import { Review } from '../../types/review.ts';

type ReviewsProps = {
  reviewsData?: Review[];
}

function Reviews({ reviewsData }: ReviewsProps): JSX.Element {
  const [reviews, setReviews] = useState(reviewsData || []);
  const handleSubmit = (review: Review): void => {
    setReviews((prevReviews: Review[]) => [review, ...prevReviews]);
  };
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            comment={review.comment}
            date={review.date}
            rating={review.rating}
            user={review.user}
          />
        ))}
      </ul>
      <ReviewForm onSubmit={handleSubmit} />
    </section>
  );
}

export default Reviews;
