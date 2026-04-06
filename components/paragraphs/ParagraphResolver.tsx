import { getParagraphComponent } from '@/lib/paragraphs/registry.tsx';

interface Props {
  paragraph: any;
}

export default function ParagraphResolver({ paragraph }: Props) {
  const type = paragraph.type ?? '';
  const Component = getParagraphComponent(type);

  if (Component) {
    return <Component paragraph={paragraph} />;
  }

  // Development fallback — shows unregistered paragraph types
  const typeName = type.replace('paragraph--', '');
  return (
    <div style={{ padding: '1rem', border: '1px dashed #ccc', margin: '0.5rem 0' }}>
      <p style={{ fontSize: '0.75rem', color: '#888' }}>
        Paragraph type: <strong>{typeName}</strong> — no component registered yet.
      </p>
    </div>
  );
}
