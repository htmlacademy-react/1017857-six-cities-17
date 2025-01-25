import {JSX, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAuthorizationStatus} from "../../store/user-process/selectors.ts";
import {AppRoute, AuthorizationStatus} from "../../const.ts";
import cn from "classnames";
import {BookmarkSettings} from "./bookmark-setting.ts";
import {uploadFavoriteStatusAction} from "../../store/api-actions.ts";
import {selectIsOfferFavorite} from "../../store/favorite-process/selectors.ts";

type BookmarkButtonProps = {
  bookmarkClass: string;
  offerId: string;
}

function BookmarkButton({ bookmarkClass, offerId }: BookmarkButtonProps): JSX.Element{
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const isAuthorized = useMemo(() => authStatus === AuthorizationStatus.Auth, [authStatus]);
  const isFavorite = useAppSelector((state) => selectIsOfferFavorite(state, offerId));

  const handleButtonClick = () => {
    console.log(isFavorite);
    if (isAuthorized) {
      setDisableButton(true);
      dispatch(uploadFavoriteStatusAction({ offerId, isFavorite }))
        .finally(() => {
          setDisableButton(false);
        });
    } else {
      navigate(AppRoute.Login);
    }
  };
  return (
    <button
      disabled={disableButton}
      className={
        cn(
          `${bookmarkClass}__bookmark-button`,
          'button',
          { [`${bookmarkClass}__bookmark-button--active`]: isFavorite && isAuthorized }
        )
      }
      onClick={handleButtonClick}
      type="button"
    >
      <svg className={`${bookmarkClass}__bookmark-icon`} width={BookmarkSettings[bookmarkClass].width} height={BookmarkSettings[bookmarkClass].height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite && isAuthorized ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
