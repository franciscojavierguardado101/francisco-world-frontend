import { getAllIncludes } from '@/lib/paragraphs/registry';
import { resolveDrupalPath, fetchDrupalResource } from '@/lib/drupal';
import { notFound } from 'next/navigation';
import ParagraphResolver from '@/components/paragraphs/ParagraphResolver';

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = '/' + slug.join('/');

  const route = await resolveDrupalPath(path);
  if (!route) return notFound();

  // Includes are automatically derived from all registered paragraph components.
  // No manual maintenance needed — adding a new component to registry.ts auto-updates includes.
  const includes = getAllIncludes();
  const data = await fetchDrupalResource(route.jsonapiUrl, includes);
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
    <main>
      {resolvedComponents.map((paragraph: any) => (
        <ParagraphResolver key={paragraph.id} paragraph={paragraph} />
      ))}
    </main>
  );
}
