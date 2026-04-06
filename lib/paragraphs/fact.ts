import { FactData } from '@/components/paragraphs/Fact/types';

export function buildFact(paragraph: any): FactData {
  const attr = paragraph.attributes ?? {};

  return {
    id:      paragraph.id,
    title:   attr.field_fact_title  ?? '',
    desc:    attr.field_fact_desc   ?? '',
    quote:   attr.field_fact_quote  ?? '',
    name:    attr.field_fact_name   ?? '',
    detail:  attr.field_fact_detail ?? '',
    position: attr.field_fact_pos   ?? 'field_fact_pos_l',
    color:   attr.field_fact_color  ?? 'field_fact_color_b',
  };
}
