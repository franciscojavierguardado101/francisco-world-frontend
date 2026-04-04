import { FeatureStackData, StackItem, StackMarksItem, StackMediaItem } from '@/components/paragraphs/FeatureStack/types';

const DRUPAL_BASE = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '';

function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${DRUPAL_BASE}${url}`;
}

function extractMedia(rel: any, included: any[]): StackMediaItem | null {
  if (!rel?.data) return null;
  const media = included.find((i: any) => i.id === rel.data.id);
  if (!media) return null;

  const imgRel = media.relationships?.field_media_image?.data;
  if (imgRel) {
    const file = included.find((i: any) => i.id === imgRel.id);
    const rawUrl = file?.attributes?.uri?.url ?? '';
    if (rawUrl) {
      return {
        type: 'image',
        url: resolveUrl(rawUrl),
        alt: media.attributes?.field_media_image?.alt ?? '',
      };
    }
  }

  const vidRel = media.relationships?.field_media_video_file?.data;
  if (vidRel) {
    const file = included.find((i: any) => i.id === vidRel.id);
    const rawUrl = file?.attributes?.uri?.url ?? '';
    if (rawUrl) {
      return { type: 'video', url: resolveUrl(rawUrl) };
    }
  }

  return null;
}

function buildStackItem(para: any, included: any[]): StackItem {
  const sa = para.attributes ?? {};
  const sr = para.relationships ?? {};
  const urlField = sa.field_stack_url;
  return {
    id: para.id,
    type: 'paragraph--stack',
    category: sa.field_stack_category ?? '',
    title: sa.field_stack_title ?? '',
    description: sa.field_stack_desc ?? '',
    url: urlField ? { uri: urlField.uri, title: urlField.title ?? '' } : null,
    media: extractMedia(sr.field_stack_media, included),
    position: sa.field_stack_pos ?? null,
    color: sa.field_stack_color ?? null,
  } as StackItem;
}

function buildStackMarksItem(para: any, included: any[]): StackMarksItem {
  const sa = para.attributes ?? {};
  const sr = para.relationships ?? {};
  const urlField = sa.field_stack_m_url;

  // Collect up to 5 details — filter out empty strings
  const details = [
    sa.field_stack_m_det_1,
    sa.field_stack_m_det_2,
    sa.field_stack_m_det_3,
    sa.field_stack_m_det_4,
    sa.field_stack_m_det_5,
  ].filter((d: string | null) => d && d.trim() !== '');

  return {
    id: para.id,
    type: 'paragraph--stack_marks',
    category: sa.field_stack_m_category ?? '',
    title: sa.field_stack_m_title ?? '',
    description: sa.field_stack_m_desc ?? '',
    details,
    url: urlField ? { uri: urlField.uri, title: urlField.title ?? '' } : null,
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

      // Route to correct builder based on paragraph type
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
