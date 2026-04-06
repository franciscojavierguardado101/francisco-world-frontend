import { registerParagraph } from '@/lib/paragraphs/registry';
import { buildDescriptiveMedia } from '@/lib/paragraphs/descriptive-media';
import DescriptiveMedia from './index';

registerParagraph({
  type: 'paragraph--descriptive_media',

  includes: [
    'field_components.field_desc_m_media',
    'field_components.field_desc_m_media.field_media_image',
  ],

  component: function DescriptiveMediaWrapper({ paragraph }: { paragraph: any }) {
    const data = buildDescriptiveMedia(paragraph);
    return <DescriptiveMedia data={data} />;
  },
});
