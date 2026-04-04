import { FeatureStackData, StackItem, StackMediaItem } from '@/components/paragraphs/FeatureStack/types';

function extractMedia(field: any): StackMediaItem | null {
  if (!field?.data) return null;
  const included = field._included;
  if (!included) return null;
  const media = included.find((i: any) => i.id === field.data.id);
  if (!media) return null;

  // Image
  const imgRel = media.relationships?.field_media_image?.data;
  if (imgRel) {
    const file = included.find((i: any) => i.id === imgRel.id);
    if (file?.attributes?.uri?.url) {
      return {
        type: 'image',
        url: file.attributes.uri.url,
        alt: media.attributes?.field_media_image?.alt || '',
      };
    }
  }

  // Video file
  const vidRel = media.relationships?.field_media_video_file?.data;
  if (vidRel) {
    const file = included.find((i: any) => i.id === vidRel.id);
    if (file?.attributes?.uri?.url) {
      return { type: 'video', url: file.attributes.uri.url };
    }
  }

  return null;
}

export function buildFeatureStack(paragraph: any): FeatureStackData {
  const attr = paragraph.attributes ?? {};
  const rel = paragraph.relationships ?? {};
  const included = paragraph._included ?? [];

  // Helper: attach _included to relationship fields for extractMedia
  const withIncluded = (field: any) => ({ ...field, _included: included });

  // Build stacks from field_feature_s_stack
  const stackRefs: any[] = rel.field_feature_s_stack?.data ?? [];
  const stacks: StackItem[] = stackRefs.map((ref: any) => {
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
      media: extractMedia(withIncluded(sr.field_stack_media ?? {})),
      position: sa.field_stack_pos ?? null,
      color: sa.field_stack_color ?? null,
    } as StackItem;
  }).filter(Boolean) as StackItem[];

  return {
    id: paragraph.id,
    title: attr.field_feature_s_title ?? '',
    description: attr.field_feature_s_desc ?? '',
    media: extractMedia(withIncluded(rel.field_feature_s_media ?? {})),
    position: attr.field_feature_s_pos ?? null,
    color: attr.field_feature_s_color ?? null,
    stacks,
  };
}
