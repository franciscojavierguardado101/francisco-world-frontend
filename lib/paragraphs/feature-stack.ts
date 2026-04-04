import { FeatureStackData, StackItem, StackMediaItem } from '@/components/paragraphs/FeatureStack/types';

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

export function buildFeatureStack(paragraph: any): FeatureStackData {
  const attr = paragraph.attributes ?? {};
  const rel = paragraph.relationships ?? {};
  const included: any[] = paragraph._included ?? [];

  const stackRefs: any[] = rel.field_feature_s_stack?.data ?? [];
  const stacks: StackItem[] = stackRefs
    .map((ref: any) => {
      const stackPara = included.find((i: any) => i.id === ref.id);
      if (!stackPara) return null;
      const sa = stackPara.attributes ?? {};
      const sr = stackPara.relationships ?? {};
      const urlField = sa.field_stack_url;

      return {
        id: stackPara.id,
        category: sa.field_stack_category ?? '',
        title: sa.field_stack_title ?? '',
        description: sa.field_stack_desc ?? '',
        url: urlField ? { uri: urlField.uri, title: urlField.title ?? '' } : null,
        media: extractMedia(sr.field_stack_media, included),
        position: sa.field_stack_pos ?? null,
        color: sa.field_stack_color ?? null,
      } as StackItem;
    })
    .filter(Boolean) as StackItem[];

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
