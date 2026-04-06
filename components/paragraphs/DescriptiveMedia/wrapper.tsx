import { buildDescriptiveMedia } from '@/lib/paragraphs/descriptive-media';
import DescriptiveMedia from './index';

export function DescriptiveMediaParagraph({ paragraph }: { paragraph: any }) {
  return <DescriptiveMedia data={buildDescriptiveMedia(paragraph)} />;
}
