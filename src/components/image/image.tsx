type ImageProps = {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProps) {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={src} alt={alt}/>
    </div>
  );
}

export default Image;
