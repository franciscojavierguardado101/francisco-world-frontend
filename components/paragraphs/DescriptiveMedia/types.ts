import { MediaItem } from '@/lib/paragraphs/utils';

export type { MediaItem };

export interface DescriptiveMediaData {
  id: string;
  caption: string;
  title: string;
  desc: string;
  url: { uri: string; title: string } | null;
  media: MediaItem | null;
  position: string;
  color: string;
}

/**
 * DescriptiveMedia color map — keyed by Drupal list_string machine name.
 * bg:        section background
 * text:      caption, title, description text color
 * btnBg:     URL button background color
 * btnText:   URL button text color
 */
export const DESC_MEDIA_COLOR_MAP: Record<string, {
  bg: string;
  text: string;
  btnBg: string;
  btnText: string;
}> = {
  field_desc_m_c_w: {
    bg:      '#ffffff',
    text:    '#000000',
    btnBg:   '#000000',
    btnText: '#ffffff',
  },
  field_desc_m_c_b: {
    bg:      '#000000',
    text:    '#ffffff',
    btnBg:   '#ffffff',
    btnText: '#000000',
  },
  field_desc_m_c_fg: {
    bg:      'rgb(21, 30, 23)',
    text:    'rgb(239, 227, 204)',
    btnBg:   'rgb(239, 227, 204)',
    btnText: 'rgb(21, 30, 23)',
  },
  field_desc_m_c_cp: {
    bg:      '#3d2940',
    text:    'rgb(239, 227, 204)',
    btnBg:   'rgb(239, 227, 204)',
    btnText: '#3d2940',
  },
  field_desc_m_c_dt: {
    bg:      '#01392c',
    text:    'rgb(239, 227, 204)',
    btnBg:   'rgb(239, 227, 204)',
    btnText: '#01392c',
  },
  field_desc_m_c_a: {
    bg:      'rgb(130, 161, 192)',
    text:    'rgb(239, 227, 204)',
    btnBg:   'rgb(239, 227, 204)',
    btnText: 'rgb(130, 161, 192)',
  },
  field_desc_m_c_cr: {
    bg:      'rgb(254, 72, 52)',
    text:    '#000000',
    btnBg:   '#000000',
    btnText: 'rgb(254, 72, 52)',
  },
  field_desc_m_c_rcr: {
    bg:      '#000000',
    text:    'rgb(254, 72, 52)',
    btnBg:   'rgb(254, 72, 52)',
    btnText: '#000000',
  },
  field_desc_m_c_lp: {
    bg:      'rgb(175, 147, 196)',
    text:    '#000000',
    btnBg:   '#000000',
    btnText: 'rgb(175, 147, 196)',
  },
  field_desc_m_c_sb: {
    bg:      '#82a1c1',
    text:    '#000000',
    btnBg:   '#000000',
    btnText: '#82a1c1',
  },
};
