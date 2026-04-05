import { registerParagraph } from '@/lib/paragraphs/registry';
import { buildFaqs } from '@/lib/paragraphs/faqs';
import FAQs from './index';

registerParagraph({
  type: 'paragraph--faqs',

  // JSON:API includes needed by this component.
  // field_faqs_links resolves the faq_link children.
  // faq_link has no media — only a link field (attribute, not relationship).
  includes: [
    'field_components.field_faqs_links',
  ],

  component: function FaqsWrapper({ paragraph }: { paragraph: any }) {
    const data = buildFaqs(paragraph);
    return <FAQs data={data} />;
  },
});
