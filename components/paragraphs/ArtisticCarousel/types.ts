import { MediaItem } from '@/lib/paragraphs/utils';

export type { MediaItem };

export interface ArtisticCardItem {
  id: string;
  type: 'paragraph--artistic_card';
  title: string;
  desc: string;
  media: MediaItem | null;
  position: string;
}

export interface ArtisticCarouselData {
  id: string;
  color: string;
  cards: ArtisticCardItem[];
}

/**
 * ArtisticCarousel color map — keyed by Drupal list_string machine name.
 * bg:   section background
 * text: all text + arrows + counter
 */
export const ARTISTIC_CAROUSEL_COLOR_MAP: Record<string, {
  bg: string;
  text: string;
}> = {
  field_art_c_color_w:   { bg: '#ffffff',            text: '#000000' },
  field_art_c_color_b:   { bg: '#000000',            text: '#ffffff' },
  field_art_c_color_ei:  { bg: '#6443f5',            text: '#ffffff' },
  field_art_c_color_fg:  { bg: 'rgb(21, 30, 23)',    text: 'rgb(239, 227, 204)' },
  field_art_c_color_dg:  { bg: '#414d1e',            text: 'rgb(239, 227, 204)' },
  field_art_c_color_dt:  { bg: '#01392c',            text: '#ffffff' },
  field_art_c_color_a:   { bg: 'rgb(130, 161, 192)', text: '#000000' },
  field_art_c_color_cr:  { bg: 'rgb(254, 72, 52)',   text: '#000000' },
  field_art_c_color_rcr: { bg: '#000000',            text: 'rgb(254, 72, 52)' },
  field_art_c_color_lg:  { bg: 'rgb(207, 245, 106)', text: '#000000' },
  field_art_c_color_rlg: { bg: '#000000',            text: 'rgb(207, 245, 106)' },
  field_art_c_color_lp:  { bg: 'rgb(175, 147, 196)', text: '#000000' },
};
