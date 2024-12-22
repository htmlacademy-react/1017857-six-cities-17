import WhatInsideItem from '../what-inside-item/what-inside-item.tsx';

type WhatInsideProps = {
  goods: string[];
}

function whatInside({ goods }: WhatInsideProps) {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((item) => (<WhatInsideItem key={item} item={item}/>))}
      </ul>
    </div>
  );
}

export default whatInside;
