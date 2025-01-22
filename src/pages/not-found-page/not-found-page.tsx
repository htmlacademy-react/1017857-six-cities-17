import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '2rem',
    }}
    >
      <Helmet>
        <title>6 cities: Page not found</title>
      </Helmet>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go home</Link>
    </div>
  );
}

export default NotFoundPage;
