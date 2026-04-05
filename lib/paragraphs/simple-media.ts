import { SimpleMediaData } from '@/components/paragraphs/SimpleMedia/types';
import { extractMedia } from '@/lib/paragraphs/utils';

export function buildSimpleMedia(paragraph: any): SimpleMediaData {
  const attr = paragraph.attributes ?? {};
  const rel  = paragraph.relationships ?? {};
  const included: any[] = paragraph._included ?? [];

  return {
    id:    paragraph.id,
    media: extractMedia(rel.field_simple_m_media, included),
    color: attr.field_simple_m_color ?? 'field_simple_m_c_w',
  };
}
