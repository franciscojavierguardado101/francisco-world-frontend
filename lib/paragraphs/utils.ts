/**
 * Shared utilities for paragraph transformers.
 * Import from here — never duplicate these functions across transformers.
 */

import { StackMediaItem } from '@/components/paragraphs/FeatureStack/types';

const DRUPAL_BASE = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? '';

/**
 * Prepends the Drupal base URL to relative file paths.
 * Absolute URLs (http/https) are returned unchanged.
 */
export function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${DRUPAL_BASE}${url}`;
}

/**
 * Extracts a media item (image or video) from a JSON:API relationship.
 * Works for any paragraph type — pass the relationship field and the included array.
 */
export function extractMedia(rel: any, included: any[]): StackMediaItem | null {
  if (!rel?.data) return null;
  const media = included.find((i: any) => i.id === rel.data.id);
  if (!media) return null;

  const imgRel = media.relationships?.field_media_image?.data;
  if (imgRel) {
    const file = included.find((i: any) => i.id === imgRel.id);
    const rawUrl = file?.attributes?.uri?.url ?? '';
    if (rawUrl) {
      return {
        type: 'image',
        url: resolveUrl(rawUrl),
        alt: media.attributes?.field_media_image?.alt ?? '',
      };
    }
  }

  const vidRel = media.relationships?.field_media_video_file?.data;
  if (vidRel) {
    const file = included.find((i: any) => i.id === vidRel.id);
    const rawUrl = file?.attributes?.uri?.url ?? '';
    if (rawUrl) {
      return { type: 'video', url: resolveUrl(rawUrl) };
    }
  }

  return null;
}

/**
 * Extracts a link field value from JSON:API attributes.
 * Returns null if the field is empty.
 */
export function extractLink(field: any): { uri: string; title: string } | null {
  if (!field?.uri) return null;
  return { uri: field.uri, title: field.title ?? '' };
}
