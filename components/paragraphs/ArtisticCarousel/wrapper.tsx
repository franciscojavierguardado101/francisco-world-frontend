import { buildArtisticCarousel } from '@/lib/paragraphs/artistic-carousel';
import ArtisticCarousel from './index';

export function ArtisticCarouselParagraph({ paragraph }: { paragraph: any }) {
  return <ArtisticCarousel data={buildArtisticCarousel(paragraph)} />;
}
