import { resolveDrupalPath, fetchDrupalResource } from '@/lib/drupal';
import { notFound } from 'next/navigation';
import ParagraphResolver from '@/components/paragraphs/ParagraphResolver';

// Global includes that apply to ANY content type with field_components.
// Add new paragraph type includes here as you build new components.
// Never list content types here — this must work with any content type.
const PARAGRAPH_INCLUDES: string[] = [
  'field_components',
  // feature_stack: parent media
  'field_components.field_feature_s_media',
  'field_components.field_feature_s_media.field_media_image',
  // feature_stack: nested stacks + their media
  'field_components.field_feature_s_stack',
  'field_components.field_feature_s_stack.field_stack_media',
  'field_components.field_feature_s_stack.field_stack_media.field_media_image',
];

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = '/' + slug.join('/');

  const route = await resolveDrupalPath(path);
  if (!route) return notFound();

  const data = await fetchDrupalResource(route.jsonapiUrl, PARAGRAPH_INCLUDES);
  if (!data) return notFound();

  const node = data.data;
  const included = data.included ?? [];
  const components = node.relationships?.field_components?.data ?? [];

  const resolvedComponents = components
    .map((ref: any) => {
      const paragraph = included.find(
        (i: any) => i.id === ref.id && i.type === ref.type
      );
      if (!paragraph) return null;
      return { ...paragraph, _included: included };
    })
    .filter(Boolean);

  return (
    <main className="pt-[76px]">
      {resolvedComponents.map((paragraph: any) => (
        <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
      ))}
    </main>
  );
}
