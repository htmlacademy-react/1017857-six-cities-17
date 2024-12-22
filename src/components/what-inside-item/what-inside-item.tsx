type WhatInsideItemProps = {
  item: string;
}

function WhatInsideItem({ item }: WhatInsideItemProps) {
  return (
    <li className="offer__inside-item">
      {item}
    </li>
  );
}

export default WhatInsideItem;
