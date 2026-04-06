import React from 'react';

export interface ParagraphRegistration {
  type: string;
  includes: string[];
  component: React.ComponentType<{ paragraph: any }>;
}

// Import wrapper components — JSX lives in component files, not here
import { FeatureStackParagraph } from '@/components/paragraphs/FeatureStack/wrapper';
import { FaqsParagraph } from '@/components/paragraphs/FAQs/wrapper';
import { SimpleMediaParagraph } from '@/components/paragraphs/SimpleMedia/wrapper';
import { FactParagraph } from '@/components/paragraphs/Fact/wrapper';
import { DescriptiveMediaParagraph } from '@/components/paragraphs/DescriptiveMedia/wrapper';
import { ArtisticCarouselParagraph } from '@/components/paragraphs/ArtisticCarousel/wrapper';

// Static registry — single source of truth for all paragraph components.
// To add a new component: add one entry here and create its wrapper.tsx.
export const PARAGRAPH_REGISTRY: ParagraphRegistration[] = [
  {
    type: 'paragraph--feature_stack',
    includes: [
      'field_components.field_feature_s_media',
      'field_components.field_feature_s_media.field_media_image',
      'field_components.field_feature_s_stack',
      'field_components.field_feature_s_stack.field_stack_media',
      'field_components.field_feature_s_stack.field_stack_media.field_media_image',
      'field_components.field_feature_s_stack.field_stack_m_media',
      'field_components.field_feature_s_stack.field_stack_m_media.field_media_image',
    ],
    component: FeatureStackParagraph,
  },
  {
    type: 'paragraph--faqs',
    includes: [
      'field_components.field_faqs_links',
    ],
    component: FaqsParagraph,
  },
  {
    type: 'paragraph--simple_media',
    includes: [
      'field_components.field_simple_m_media',
      'field_components.field_simple_m_media.field_media_image',
    ],
    component: SimpleMediaParagraph,
  },
  {
    type: 'paragraph--fact',
    includes: [],
    component: FactParagraph,
  },
  {
    type: 'paragraph--descriptive_media',
    includes: [
      'field_components.field_desc_m_media',
      'field_components.field_desc_m_media.field_media_image',
    ],
    component: DescriptiveMediaParagraph,
  },
  {
    type: 'paragraph--artistic_carousel',
    includes: [
      'field_components.field_art_c_a_c',
      'field_components.field_art_c_a_c.field_art_c_media',
      'field_components.field_art_c_a_c.field_art_c_media.field_media_image',
    ],
    component: ArtisticCarouselParagraph,
  },
];

// Derived lookup map for O(1) component resolution
const registryMap = new Map(
  PARAGRAPH_REGISTRY.map(r => [r.type, r])
);

export function getParagraphComponent(
  type: string
): React.ComponentType<{ paragraph: any }> | null {
  return registryMap.get(type)?.component ?? null;
}

export function getAllIncludes(): string[] {
  const base = ['field_components'];
  const paragraphIncludes = PARAGRAPH_REGISTRY.flatMap(r => r.includes);
  return Array.from(new Set([...base, ...paragraphIncludes]));
}

export function isRegistered(type: string): boolean {
  return registryMap.has(type);
}
