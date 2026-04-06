import { buildSimpleMedia } from '@/lib/paragraphs/simple-media';
import SimpleMedia from './index';

export function SimpleMediaParagraph({ paragraph }: { paragraph: any }) {
  return <SimpleMedia data={buildSimpleMedia(paragraph)} />;
}
