import { Link } from 'react-router-dom';
import { logoutAction } from '../store/api-actions.ts';
import { useAppDispatch } from '../hooks';

function LogoutLink() {
  const dispatch = useAppDispatch();
  return (
    <Link
      className="header__nav-link"
      to='/'
      onClick={(event) => {
        event.preventDefault();
        dispatch(logoutAction());
      }}
    >
      <span className="header__signout">Sign out</span>
    </Link>
  );
}

export default LogoutLink;
