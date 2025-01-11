import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';

type ProfileLinkProps = {
  authorizationStatus: AuthorizationStatus;
}

function ProfileLink({ authorizationStatus }: ProfileLinkProps) {
  return (
    <Link className="header__nav-link header__nav-link--profile" to={authorizationStatus === AuthorizationStatus.Auth ? '#' : AppRoute.Login}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      {authorizationStatus === AuthorizationStatus.Auth ?
        <>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          <span className="header__favorite-count">3</span>
        </> :
        <span className="header__login">Sign in</span>}
    </Link>
  );
}

export default ProfileLink;
