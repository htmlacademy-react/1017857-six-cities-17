import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Offer, OfferExtended } from '../../types/offer.ts';
import { AppRoute } from '../../const.ts';
import OfferCard from '../../components/offer-card/offer-card.tsx';
import Neighbourhood from '../../components/neighbourhood/neighbourhood.tsx';
import { reviews } from '../../mocks/reviews.ts';
import { neighbourhood } from '../../mocks/neighbourhood.ts';

type OfferPageProps = {
  offersExtended: OfferExtended[];
  offers: Offer[];
};

function OfferPage({ offersExtended, offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const currentOfferExt: OfferExtended | undefined = offersExtended.find((offer: OfferExtended) => offer.id === id);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src={'img/logo.svg'} alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        {currentOfferExt && <OfferCard currentOffer={currentOfferExt} reviewsData={reviews} neighbourhoods={neighbourhood} offers={offers} />}
        <Neighbourhood places={neighbourhood} />
      </main>
    </div>
  );
}

export default OfferPage;
