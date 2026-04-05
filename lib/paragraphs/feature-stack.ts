import { FeatureStackData, StackItem, StackMarksItem } from '@/components/paragraphs/FeatureStack/types';
import { extractMedia, extractLink } from '@/lib/paragraphs/utils';

function buildStackItem(para: any, included: any[]): StackItem {
  const sa = para.attributes ?? {};
  const sr = para.relationships ?? {};
  return {
    id: para.id,
    type: 'paragraph--stack',
    category: sa.field_stack_category ?? '',
    title: sa.field_stack_title ?? '',
    description: sa.field_stack_desc ?? '',
    url: extractLink(sa.field_stack_url),
    media: extractMedia(sr.field_stack_media, included),
    position: sa.field_stack_pos ?? null,
    color: sa.field_stack_color ?? null,
  };
}

function buildStackMarksItem(para: any, included: any[]): StackMarksItem {
  const sa = para.attributes ?? {};
  const sr = para.relationships ?? {};

  const details = [
    sa.field_stack_m_det_1,
    sa.field_stack_m_det_2,
    sa.field_stack_m_det_3,
    sa.field_stack_m_det_4,
    sa.field_stack_m_det_5,
  ].filter((d: string | null | undefined) => d && d.trim() !== '') as string[];

  return {
    id: para.id,
    type: 'paragraph--stack_marks',
    category: sa.field_stack_m_category ?? '',
    title: sa.field_stack_m_title ?? '',
    description: sa.field_stack_m_desc ?? '',
    details,
    url: extractLink(sa.field_stack_m_url),
    media: extractMedia(sr.field_stack_m_media, included),
    position: sa.field_stack_m_pos ?? null,
    color: sa.field_stack_m_color ?? null,
  };
}

export function buildFeatureStack(paragraph: any): FeatureStackData {
  const attr = paragraph.attributes ?? {};
  const rel = paragraph.relationships ?? {};
  const included: any[] = paragraph._included ?? [];

  const stackRefs: any[] = rel.field_feature_s_stack?.data ?? [];

  const stacks = stackRefs
    .map((ref: any) => {
      const para = included.find((i: any) => i.id === ref.id);
      if (!para) return null;
      if (para.type === 'paragraph--stack_marks') {
        return buildStackMarksItem(para, included);
      }
      return buildStackItem(para, included);
    })
    .filter(Boolean) as (StackItem | StackMarksItem)[];

  return {
    id: paragraph.id,
    title: attr.field_feature_s_title ?? '',
    description: attr.field_feature_s_desc ?? '',
    media: extractMedia(rel.field_feature_s_media, included),
    position: attr.field_feature_s_pos ?? null,
    color: attr.field_feature_s_color ?? null,
    stacks,
  };
}
