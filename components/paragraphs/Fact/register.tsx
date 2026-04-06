import { registerParagraph } from '@/lib/paragraphs/registry';
import { buildFact } from '@/lib/paragraphs/fact';
import Fact from './index';

registerParagraph({
  type: 'paragraph--fact',

  // Fact has no media or nested paragraphs — all fields are attributes.
  // field_components alone is sufficient.
  includes: [],

  component: function FactWrapper({ paragraph }: { paragraph: any }) {
    const data = buildFact(paragraph);
    return <Fact data={data} />;
  },
});
