import { genres } from '../models';

export function genreNameTranslation(genreNameEn?: string): string | null {
  const genreNameRu = genres.find((genre) => genre.en === genreNameEn)?.ru;
  if (genreNameRu) return genreNameRu;
  else return null;
}
