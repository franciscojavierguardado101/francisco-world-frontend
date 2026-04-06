export interface FactData {
  id: string;
  title: string;
  desc: string;
  quote: string;
  name: string;
  detail: string;
  position: 'field_fact_pos_l' | 'field_fact_pos_r';
  color: string;
}

/**
 * Fact color map — keyed by Drupal list_string machine name.
 * bg:   section background
 * text: all text including the quote mark character
 */
export const FACT_COLOR_MAP: Record<string, {
  bg: string;
  text: string;
}> = {
  field_fact_color_b:   { bg: '#000000',            text: '#ffffff' },
  field_fact_color_w:   { bg: '#ffffff',            text: '#000000' },
  field_fact_color_ei:  { bg: '#6443f5',            text: '#000000' },
  field_fact_color_pg:  { bg: '#3d2940',            text: '#ffffff' },
  field_fact_color_do:  { bg: '#414d1e',            text: '#000000' },
  field_fact_color_dt:  { bg: '#01392c',            text: '#ffffff' },
  field_fact_color_am:  { bg: 'rgb(130, 161, 192)', text: '#000000' },
  field_fact_color_cr:  { bg: 'rgb(254, 72, 52)',   text: '#000000' },
  field_fact_color_rcr: { bg: '#000000',            text: 'rgb(254, 72, 52)' },
  field_fact_color_ram: { bg: '#000000',            text: 'rgb(130, 161, 192)' },
};
