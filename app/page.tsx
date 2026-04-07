import { getAllIncludes } from '@/lib/paragraphs/registry';
import { resolveDrupalPath, fetchDrupalResource } from '@/lib/drupal';
import ParagraphResolver from '@/components/paragraphs/ParagraphResolver';

export default async function HomePage() {
  const route = await resolveDrupalPath('/');
  if (!route) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No homepage configured in Drupal yet.</p>
      </main>
    );
  }

  const includes = getAllIncludes();
  const data = await fetchDrupalResource(route.jsonapiUrl, includes);
  if (!data) return null;

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
