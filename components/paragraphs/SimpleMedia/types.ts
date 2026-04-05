import { StackMediaItem } from '@/components/paragraphs/FeatureStack/types';

export { StackMediaItem };

export interface SimpleMediaData {
  id: string;
  media: StackMediaItem | null;
  color: string;
}

/**
 * SimpleMedia color map — keyed by Drupal list_string machine name.
 * bg: section background color that frames the media as a cinematic border.
 */
export const SIMPLE_MEDIA_COLOR_MAP: Record<string, { bg: string }> = {
  field_simple_m_c_w:  { bg: '#ffffff' },
  field_simple_m_c_b:  { bg: '#000000' },
  field_simple_m_c_o:  { bg: '#414d1e' },
  field_simple_m_c_bg: { bg: 'rgb(130, 161, 192)' },
  field_simple_m_c_c:  { bg: 'rgb(254, 72, 52)' },
  field_simple_m_c_l:  { bg: 'rgb(175, 147, 196)' },
};
