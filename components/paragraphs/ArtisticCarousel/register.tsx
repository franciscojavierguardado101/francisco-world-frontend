import { registerParagraph } from '@/lib/paragraphs/registry';
import { buildArtisticCarousel } from '@/lib/paragraphs/artistic-carousel';
import ArtisticCarousel from './index';

registerParagraph({
  type: 'paragraph--artistic_carousel',

  includes: [
    'field_components.field_art_c_a_c',
    'field_components.field_art_c_a_c.field_art_c_media',
    'field_components.field_art_c_a_c.field_art_c_media.field_media_image',
  ],

  component: function ArtisticCarouselWrapper({ paragraph }: { paragraph: any }) {
    const data = buildArtisticCarousel(paragraph);
    return <ArtisticCarousel data={data} />;
  },
});
