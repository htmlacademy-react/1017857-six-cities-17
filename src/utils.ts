import uniqid from 'uniqid';

const convertRating = (rating: number) => rating * 100 / 5;

const getUniqId = () => uniqid('prefix-', '-suffix');

export { convertRating, getUniqId };
