// Self-registration for the FeatureStack paragraph component.
// This file is the ONLY file that needs to exist to wire this component
// into the Next.js frontend. Import it in lib/paragraphs/index.ts and done.

import { registerParagraph } from '@/lib/paragraphs/registry';
import { buildFeatureStack } from '@/lib/paragraphs/feature-stack';
import FeatureStack from './index';

registerParagraph({
  type: 'paragraph--feature_stack',

  // All JSON:API includes this component needs.
  // Paths are relative to field_components.
  includes: [
    'field_components.field_feature_s_media',
    'field_components.field_feature_s_media.field_media_image',
    'field_components.field_feature_s_stack',
    'field_components.field_feature_s_stack.field_stack_media',
    'field_components.field_feature_s_stack.field_stack_media.field_media_image',
  ],

  // Wrapper component that transforms raw Drupal JSON:API data and renders
  component: function FeatureStackWrapper({ paragraph }: { paragraph: any }) {
    const data = buildFeatureStack(paragraph);
    return <FeatureStack data={data} />;
  },
});
