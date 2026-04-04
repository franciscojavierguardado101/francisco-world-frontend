import React from 'react';

export interface ParagraphRegistration {
  // The Drupal paragraph type e.g. 'paragraph--feature_stack'
  type: string;
  // JSON:API includes needed by this component e.g. ['field_components.field_feature_s_media']
  includes: string[];
  // The React component that renders this paragraph
  component: React.ComponentType<{ paragraph: any }>;
}

// Central registry — all paragraph components register themselves here.
// To add a new paragraph: create register.ts in your component folder and import it below.
// Nothing else needs to change — ParagraphResolver and PARAGRAPH_INCLUDES are driven by this.
const registry: Map<string, ParagraphRegistration> = new Map();

export function registerParagraph(registration: ParagraphRegistration): void {
  registry.set(registration.type, registration);
}

export function getParagraphComponent(
  type: string
): React.ComponentType<{ paragraph: any }> | null {
  return registry.get(type)?.component ?? null;
}

export function getAllIncludes(): string[] {
  const base = ['field_components'];
  const paragraphIncludes = Array.from(registry.values()).flatMap(r => r.includes);
  // Deduplicate
  return Array.from(new Set([...base, ...paragraphIncludes]));
}

export function isRegistered(type: string): boolean {
  return registry.has(type);
}

export default registry;
