import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions.ts';

type ReviewFormProps = {
  offerId: string;
}

function ReviewForm({ offerId }: ReviewFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = rating !== null && comment.length >= 50 && comment.length <= 300;

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    setIsSubmitting(true);
    dispatch(postReviewAction({
      offerId,
      comment,
      rating,
    }));
    setRating(null);
    setComment('');
    setIsSubmitting(false);

  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={() => handleRatingChange(5)}
          disabled={isSubmitting}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={() => handleRatingChange(4)}
          disabled={isSubmitting}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={() => handleRatingChange(3)}
          disabled={isSubmitting}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={() => handleRatingChange(2)}
          disabled={isSubmitting}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={() => handleRatingChange(1)}
          disabled={isSubmitting}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
