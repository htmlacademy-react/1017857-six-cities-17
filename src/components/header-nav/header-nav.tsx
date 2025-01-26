import ProfileLink from '../profile-link/profile-link.tsx';
import LogoutLink from '../logout-link.tsx';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const.ts';
import { getAuthorizationStatus, getEmail } from '../../store/user-process/selectors.ts';
import { selectFavoriteOffers } from '../../store/favorite-process/selectors.ts';

function HeaderNav() {
  const authorizationStatus = useAppSelector((getAuthorizationStatus));
  const favoriteOffers = useAppSelector((selectFavoriteOffers));
  const email = useAppSelector(getEmail);
  const favoriteCount = favoriteOffers && favoriteOffers.length > 0 ? favoriteOffers.length : 0;
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <ProfileLink authorizationStatus={authorizationStatus} email={email} favoriteCount={favoriteCount} />
        </li>
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth && < LogoutLink />}
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
