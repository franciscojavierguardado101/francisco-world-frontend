import { buildFact } from '@/lib/paragraphs/fact';
import Fact from './index';

export function FactParagraph({ paragraph }: { paragraph: any }) {
  return <Fact data={buildFact(paragraph)} />;
}
