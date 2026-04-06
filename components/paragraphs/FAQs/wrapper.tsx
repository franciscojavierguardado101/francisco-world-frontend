import { buildFaqs } from '@/lib/paragraphs/faqs';
import FAQs from './index';

export function FaqsParagraph({ paragraph }: { paragraph: any }) {
  return <FAQs data={buildFaqs(paragraph)} />;
}
