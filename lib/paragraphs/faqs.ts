import { FaqsData, FaqLinkItem } from '@/components/paragraphs/FAQs/types';
import { extractLink } from '@/lib/paragraphs/utils';

function buildFaqLinkItem(para: any): FaqLinkItem {
  const sa = para.attributes ?? {};
  return {
    id: para.id,
    type: 'paragraph--faq_link',
    link: extractLink(sa.faq_link_link),
  };
}

export function buildFaqs(paragraph: any): FaqsData {
  const attr = paragraph.attributes ?? {};
  const rel  = paragraph.relationships ?? {};
  const included: any[] = paragraph._included ?? [];

  const linkRefs: any[] = rel.field_faqs_links?.data ?? [];

  const links = linkRefs
    .map((ref: any) => {
      const para = included.find((i: any) => i.id === ref.id);
      if (!para) return null;
      return buildFaqLinkItem(para);
    })
    .filter(Boolean) as FaqLinkItem[];

  return {
    id: paragraph.id,
    caption: attr.field_faqs_caption ?? '',
    title:   attr.field_faqs_title ?? '',
    url:     extractLink(attr.field_faqs_url),
    color:   attr.field_faqs_color ?? 'field_faqs_c_w',
    links,
  };
}
