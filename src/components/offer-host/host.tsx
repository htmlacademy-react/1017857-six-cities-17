import { Host } from '../../types/offer.ts';

type HostProps = {
  host: Host;
  description: string;
}

function OfferHost({ host, description }: HostProps) {
  const { isPro, name, avatarUrl } = host;
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div
          className={isPro ?
            'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' :
            'offer__avatar-wrapper user__avatar-wrapper'}
        >
          <img
            className="offer__avatar user__avatar"
            src={avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{name}</span>
        {isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="offer__description">
        {description.split("\n").map((paragraph, index) => (
          <p className="offer__text" key={index}>
            {paragraph}
          </p>))}
      </div>
    </div>
  );
}

export default OfferHost;
