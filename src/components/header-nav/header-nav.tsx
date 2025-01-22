import ProfileLink from '../profile-link/profile-link.tsx';
import LogoutLink from '../logout-link.tsx';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const.ts';
import { getAuthorizationStatus, getEmail } from '../../store/user-process/selectors.ts';

function HeaderNav() {
  const authorizationStatus = useAppSelector((getAuthorizationStatus));
  const email = useAppSelector(getEmail);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <ProfileLink authorizationStatus={authorizationStatus} email={email} />
        </li>
        <li className="header__nav-item">
          {authorizationStatus === AuthorizationStatus.Auth && < LogoutLink />}
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
