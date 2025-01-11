import ProfileLink from '../profile-link/profile-link.tsx';
import LogoutLink from '../logout-link.tsx';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const.ts';

function HeaderNav() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <ProfileLink authorizationStatus={authorizationStatus} />
        </li>
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth && < LogoutLink />}
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
