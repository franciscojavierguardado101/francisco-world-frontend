import { registerParagraph } from '@/lib/paragraphs/registry';
import { buildSimpleMedia } from '@/lib/paragraphs/simple-media';
import SimpleMedia from './index';

registerParagraph({
  type: 'paragraph--simple_media',

  // JSON:API includes needed by this component.
  includes: [
    'field_components.field_simple_m_media',
    'field_components.field_simple_m_media.field_media_image',
  ],

  component: function SimpleMediaWrapper({ paragraph }: { paragraph: any }) {
    const data = buildSimpleMedia(paragraph);
    return <SimpleMedia data={data} />;
  },
});
