export interface FaqLinkItem {
  id: string;
  type: 'paragraph--faq_link';
  link: { uri: string; title: string } | null;
}

export interface FaqsData {
  id: string;
  caption: string;
  title: string;
  url: { uri: string; title: string } | null;
  color: string;
  links: FaqLinkItem[];
}

/**
 * FAQs color map — keyed by Drupal list_string machine name.
 *
 * bg:         section background color
 * text:       caption, title, see-all-url text color
 * linkText:   faq_link text color (default state)
 * linkBorder: bottom border color on each link row
 * hoverBg:    faq_link background on hover
 * hoverText:  faq_link text + arrow color on hover
 */
export const FAQS_COLOR_MAP: Record<string, {
  bg: string;
  text: string;
  linkText: string;
  linkBorder: string;
  hoverBg: string;
  hoverText: string;
}> = {
  field_faqs_c_w: {
    bg:         '#ffffff',
    text:       '#000000',
    linkText:   '#000000',
    linkBorder: 'rgba(0,0,0,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_b: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    '#ffffff',
    hoverText:  '#000000',
  },
  field_faqs_c_e_i: {
    bg:         '#6443f5',
    text:       '#000000',
    linkText:   '#000000',
    linkBorder: 'rgba(0,0,0,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_r_e_i: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    '#6443f5',
    hoverText:  '#000000',
  },
  field_faqs_c_p: {
    bg:         '#3d2940',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_r_p: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    '#3d2940',
    hoverText:  '#ffffff',
  },
  field_faqs_c_o: {
    bg:         '#414d1e',
    text:       '#000000',
    linkText:   '#000000',
    linkBorder: 'rgba(0,0,0,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_r_o: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    '#414d1e',
    hoverText:  '#000000',
  },
  field_faqs_c_rf: {
    bg:         '#01392c',
    text:       '#000000',
    linkText:   '#000000',
    linkBorder: 'rgba(0,0,0,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_r_rf: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    '#01392c',
    hoverText:  '#000000',
  },
  field_faqs_c_a: {
    bg:         'rgb(130, 161, 192)',
    text:       '#000000',
    linkText:   '#000000',
    linkBorder: 'rgba(0,0,0,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_r_a: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    'rgb(130, 161, 192)',
    hoverText:  '#000000',
  },
  field_faqs_c_cr: {
    bg:         'rgb(254, 72, 52)',
    text:       '#000000',
    linkText:   '#000000',
    linkBorder: 'rgba(0,0,0,0.15)',
    hoverBg:    '#000000',
    hoverText:  '#ffffff',
  },
  field_faqs_c_r_cr: {
    bg:         '#000000',
    text:       '#ffffff',
    linkText:   '#ffffff',
    linkBorder: 'rgba(255,255,255,0.15)',
    hoverBg:    'rgb(254, 72, 52)',
    hoverText:  '#000000',
  },
};
