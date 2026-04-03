import { resolveDrupalPath, fetchDrupalResource } from '@/lib/drupal';
import { notFound } from 'next/navigation';
import ParagraphResolver from '@/components/paragraphs/ParagraphResolver';

const INCLUDE_MAP: Record<string, string[]> = {
  landing_page: [
    'field_components',
  ],
  article: [],
  page: [
    'field_components',
  ],
};

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = '/' + slug.join('/');

  const route = await resolveDrupalPath(path);
  if (!route) return notFound();

  const includes = INCLUDE_MAP[route.bundle] ?? [];
  const data = await fetchDrupalResource(route.jsonapiUrl, includes);
  if (!data) return notFound();

  const node = data.data;
  const included = data.included ?? [];
  const components = node.relationships?.field_components?.data ?? [];

  const resolvedComponents = components.map((ref: any) => {
    const paragraph = included.find(
      (i: any) => i.id === ref.id && i.type === ref.type
    );
    if (!paragraph) return null;
    return { ...paragraph, _included: included };
  }).filter(Boolean);

  return (
    <main>
      <h1>{node.attributes?.title}</h1>
      {resolvedComponents.map((paragraph: any) => (
        <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
      ))}
    </main>
  );
}
