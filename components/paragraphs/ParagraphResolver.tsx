import FeatureStack from './FeatureStack';
import { buildFeatureStack } from '@/lib/paragraphs/feature-stack';
import React from 'react';

interface ParagraphResolverProps {
  paragraph: any;
}

export default function ParagraphResolver({ paragraph }: ParagraphResolverProps) {
  const type = paragraph.type ?? '';

  switch (type) {
    case 'paragraph--feature_stack':
      return <FeatureStack data={buildFeatureStack(paragraph)} />;

    default: {
      const typeName = type.replace('paragraph--', '');
      return (
        <div style={{ padding: '1rem', border: '1px dashed #ccc', margin: '0.5rem 0' }}>
          <p style={{ fontSize: '0.75rem', color: '#888' }}>
            Paragraph type: <strong>{typeName}</strong> — no component mapped yet.
          </p>
        </div>
      );
    }
  }
}
