import { ArtisticCarouselData, ArtisticCardItem } from '@/components/paragraphs/ArtisticCarousel/types';
import { extractMedia } from '@/lib/paragraphs/utils';

function buildArtisticCard(para: any, included: any[]): ArtisticCardItem {
  const sa = para.attributes ?? {};
  const sr = para.relationships ?? {};
  return {
    id:       para.id,
    type:     'paragraph--artistic_card',
    title:    sa.field_art_c_title ?? '',
    desc:     sa.field_art_c_desc  ?? '',
    media:    extractMedia(sr.field_art_c_media, included),
    position: sa.field_art_c_pos   ?? 'field_art_c_pos_l',
  };
}

export function buildArtisticCarousel(paragraph: any): ArtisticCarouselData {
  const attr = paragraph.attributes ?? {};
  const rel  = paragraph.relationships ?? {};
  const included: any[] = paragraph._included ?? [];

  const cardRefs: any[] = rel.field_art_c_a_c?.data ?? [];

  const cards = cardRefs
    .map((ref: any) => {
      const para = included.find((i: any) => i.id === ref.id);
      if (!para) return null;
      return buildArtisticCard(para, included);
    })
    .filter(Boolean) as ArtisticCardItem[];

  return {
    id:    paragraph.id,
    color: attr.field_art_c_color ?? 'field_art_c_color_w',
    cards,
  };
}
