import MainPage from '../../pages/main-page/main-page.tsx';

type AppProps = {
  placeCardCount: number;
}

function App({ placeCardCount }: AppProps): JSX.Element {
  return (
    <MainPage placeCardCount={ placeCardCount } />
  );
}

export default App;
