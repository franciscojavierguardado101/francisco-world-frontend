import { buildFeatureStack } from '@/lib/paragraphs/feature-stack';
import FeatureStack from './index';

export function FeatureStackParagraph({ paragraph }: { paragraph: any }) {
  return <FeatureStack data={buildFeatureStack(paragraph)} />;
}
