import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/offer.ts';
import Header from '../../components/header/header.tsx';
import MainPageContent from '../../components/main-page-content/main-page-content.tsx';
import { useAppSelector } from '../../hooks';
import { isPlacesDataPending } from '../../store/places-process/selectors.ts';
import LoadingScreen from '../../components/loading-screen/loading-screen.tsx';

type MainPageProps = {
  offers: Offer[];
};

function MainPage({ offers }: MainPageProps): JSX.Element {
  const isLoading = useAppSelector(isPlacesDataPending);
  if (isLoading) {
    return (<LoadingScreen />);
  }
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <MainPageContent offers={offers} />
    </div>
  );
}

export default MainPage;
