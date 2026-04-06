import React from 'react';

// Static paragraph registry — maps Drupal paragraph types to their components and includes.
// Adding a new component: add one entry to PARAGRAPH_REGISTRY below.
// This is the single source of truth for all paragraph components.

export interface ParagraphRegistration {
  type: string;
  includes: string[];
  component: React.ComponentType<{ paragraph: any }>;
}

// Import all transformers
import { buildFeatureStack } from '@/lib/paragraphs/feature-stack';
import { buildFaqs } from '@/lib/paragraphs/faqs';
import { buildSimpleMedia } from '@/lib/paragraphs/simple-media';
import { buildFact } from '@/lib/paragraphs/fact';
import { buildDescriptiveMedia } from '@/lib/paragraphs/descriptive-media';
import { buildArtisticCarousel } from '@/lib/paragraphs/artistic-carousel';

// Import all components
import FeatureStack from '@/components/paragraphs/FeatureStack/index';
import FAQs from '@/components/paragraphs/FAQs/index';
import SimpleMedia from '@/components/paragraphs/SimpleMedia/index';
import Fact from '@/components/paragraphs/Fact/index';
import DescriptiveMedia from '@/components/paragraphs/DescriptiveMedia/index';
import ArtisticCarousel from '@/components/paragraphs/ArtisticCarousel/index';

// Static registry — guaranteed to work in Next.js App Router production builds.
// To add a new component: add one entry here. This is the only file that changes.
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
    component: function FeatureStackWrapper({ paragraph }: { paragraph: any }) {
      return <FeatureStack data={buildFeatureStack(paragraph)} />;
    },
  },
  {
    type: 'paragraph--faqs',
    includes: [
      'field_components.field_faqs_links',
    ],
    component: function FaqsWrapper({ paragraph }: { paragraph: any }) {
      return <FAQs data={buildFaqs(paragraph)} />;
    },
  },
  {
    type: 'paragraph--simple_media',
    includes: [
      'field_components.field_simple_m_media',
      'field_components.field_simple_m_media.field_media_image',
    ],
    component: function SimpleMediaWrapper({ paragraph }: { paragraph: any }) {
      return <SimpleMedia data={buildSimpleMedia(paragraph)} />;
    },
  },
  {
    type: 'paragraph--fact',
    includes: [],
    component: function FactWrapper({ paragraph }: { paragraph: any }) {
      return <Fact data={buildFact(paragraph)} />;
    },
  },
  {
    type: 'paragraph--descriptive_media',
    includes: [
      'field_components.field_desc_m_media',
      'field_components.field_desc_m_media.field_media_image',
    ],
    component: function DescriptiveMediaWrapper({ paragraph }: { paragraph: any }) {
      return <DescriptiveMedia data={buildDescriptiveMedia(paragraph)} />;
    },
  },
  {
    type: 'paragraph--artistic_carousel',
    includes: [
      'field_components.field_art_c_a_c',
      'field_components.field_art_c_a_c.field_art_c_media',
      'field_components.field_art_c_a_c.field_art_c_media.field_media_image',
    ],
    component: function ArtisticCarouselWrapper({ paragraph }: { paragraph: any }) {
      return <ArtisticCarousel data={buildArtisticCarousel(paragraph)} />;
    },
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
