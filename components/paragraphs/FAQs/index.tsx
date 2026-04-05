import { FaqsData, FAQS_COLOR_MAP } from './types';
import FaqLinkItem from './FaqLinkItem';

interface Props {
  data: FaqsData;
}

function ArrowRightSmall({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-4 h-4 flex-shrink-0"
      fill="currentColor"
      aria-hidden="true"
      style={{ color }}
    >
      <path d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z" />
    </svg>
  );
}

export default function FAQs({ data }: Props) {
  const colors = FAQS_COLOR_MAP[data.color] ?? FAQS_COLOR_MAP['field_faqs_c_w'];

  return (
    <section
      style={{ backgroundColor: colors.bg, paddingTop: '76px' }}
      className="w-full"
    >
      <div className="max-w-[1524px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left side — caption + title only */}
          <div className="flex flex-col gap-4">
            {data.caption && (
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: colors.text }}
              >
                {data.caption}
              </span>
            )}
            {data.title && (
              <h2
                className="text-6xl lg:text-7xl font-bold leading-none"
                style={{ color: colors.text }}
              >
                {data.title}
              </h2>
            )}
          </div>

          {/* Right side — link list + see-all url below */}
          <div className="flex flex-col gap-0" style={{ width: '556px', maxWidth: '100%' }}>
            {data.links.length > 0 && (
              <ul
                className="p-0 m-0"
                style={{ borderTop: `1px solid ${colors.text}` }}
              >
                {data.links.map((item) => (
                  <FaqLinkItem
                    key={item.id}
                    item={item}
                    linkText={colors.linkText}
                    linkBorder={colors.text}
                    hoverBg={colors.hoverBg}
                    hoverText={colors.hoverText}
                  />
                ))}
              </ul>
            )}

            {/* See-all URL — below the link list */}
            {data.url && (
              <a
                href={data.url.uri}
                className="inline-flex items-center gap-2 mt-6 font-bold text-sm transition-transform hover:scale-105 inline-block"
                style={{ color: colors.text, textDecoration: 'none' }}
              >
                {data.url.title || 'See all'}
                <ArrowRightSmall color={colors.text} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
