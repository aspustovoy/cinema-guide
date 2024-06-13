export function getClassNameByRating(rating: number): string {
  if (rating >= 8) return '--gold';
  if (rating >= 7 && rating < 8) return '--green';
  if (rating >= 5 && rating < 7) return '--grey';
  if (rating < 5) return '--red';
  else return 'movie-rating';
}
