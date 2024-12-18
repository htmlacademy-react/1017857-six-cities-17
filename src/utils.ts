import uniqid from 'uniqid';

const convertRating = (rating: number) => rating * 100 / 5;

const getUniqId = (): string  => {
  return uniqid();
}

export { convertRating, getUniqId };
