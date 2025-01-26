import { JSX, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearbyAction, fetchOfferByIdAction, fetchReviewAction } from '../../store/api-actions.ts';
import { Offer, OfferExtended } from '../../types/offer.ts';
import OfferCard from '../../components/offer-card/offer-card.tsx';
import Neighbourhood from '../../components/neighbourhood/neighbourhood.tsx';
import { Review } from '../../types/review.ts';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import { Setting } from '../../const.ts';
import { checkErrorStatus, getNearbyData, getOfferData } from '../../store/offer-process/selectors.ts';
import { getReviewData } from '../../store/review-process/selectors.ts';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isErrorOffer = useAppSelector(checkErrorStatus);
  const neighbourhoodCount = Setting.NeighbourhoodCount;
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyAction(id));
      dispatch(fetchReviewAction(id));
    }
  }, [id, dispatch]);

  const offerData: OfferExtended | null = useAppSelector(getOfferData);
  const nearbyData: Offer[] | null = useAppSelector(getNearbyData);
  const reviewData: Review[] | null = useAppSelector(getReviewData);
  const nearbyList = nearbyData?.slice(0, neighbourhoodCount);

  if (isErrorOffer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        {(offerData && true) && <OfferCard currentOffer={offerData} reviewsData={reviewData} neighbourhoods={nearbyList}/>}
        {(offerData && true) && <Neighbourhood places={nearbyList}/>}
      </main>
    </div>
  );
}

export default OfferPage;
