import { DescriptiveMediaData } from '@/components/paragraphs/DescriptiveMedia/types';
import { extractMedia, extractLink } from '@/lib/paragraphs/utils';

export function buildDescriptiveMedia(paragraph: any): DescriptiveMediaData {
  const attr = paragraph.attributes ?? {};
  const rel  = paragraph.relationships ?? {};
  const included: any[] = paragraph._included ?? [];

  return {
    id:       paragraph.id,
    caption:  attr.field_desc_m_capt  ?? '',
    title:    attr.field_desc_m_title ?? '',
    desc:     attr.field_desc_m_desc  ?? '',
    url:      extractLink(attr.field_desc_m_url),
    media:    extractMedia(rel.field_desc_m_media, included),
    position: attr.field_desc_m_pos   ?? 'field_desc_m_pos_l',
    color:    attr.field_desc_m_color ?? 'field_desc_m_c_b',
  };
}
