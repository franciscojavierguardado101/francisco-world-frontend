import React from 'react';

interface ParagraphResolverProps {
  paragraph: any;
}

export default function ParagraphResolver({ paragraph }: ParagraphResolverProps) {
  const type = paragraph.type?.replace('paragraph--', '') ?? '';

  switch (type) {
    // Add new paragraph cases here as you build components
    // case 'hero': return <Hero paragraph={paragraph} />;
    default:
      return (
        <div style={{ padding: '1rem', border: '1px dashed #ccc', margin: '0.5rem 0' }}>
          <p style={{ fontSize: '0.75rem', color: '#888' }}>
            Paragraph type: <strong>{type}</strong> — no component mapped yet.
          </p>
        </div>
      );
  }
}
