'use client';

import { FaqLinkItem as FaqLinkItemType } from './types';

interface Props {
  item: FaqLinkItemType;
  linkText: string;
  linkBorder: string;
  hoverBg: string;
  hoverText: string;
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-0 transition-opacity duration-200"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10.586 3.5a.999.999 0 0 1 1.707-.707l9.207 9.2-9.207 9.202a1 1 0 1 1-1.414-1.413L17.665 13H3.5a1 1 0 1 1 0-2h14.178l-6.799-6.794a.999.999 0 0 1-.293-.707z" />
    </svg>
  );
}

export default function FaqLinkItem({ item, linkText, linkBorder, hoverBg, hoverText }: Props) {
  if (!item.link) return null;

  return (
    // group is on li so group-hover affects the border
    <li
      className="group list-none border-b-0 transition-all duration-200"
      style={{ borderTop: `1px solid ${linkBorder}` }}
    >
      <style>{`
        .faq-li-hover:hover {
          border-top-color: transparent !important;
        }
      `}</style>
      <a
        href={item.link.uri}
        className="faq-li-hover relative flex items-center justify-between w-full overflow-hidden"
        style={{ textDecoration: 'none', minHeight: '64px', padding: '0 20px' }}
      >
        {/* Hover background fill from left */}
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"
          style={{ backgroundColor: hoverBg }}
          aria-hidden="true"
        />

        {/* Link text */}
        <span
          className="relative z-10 text-lg font-bold leading-tight"
          style={{ color: linkText }}
        >
          <span className="group-hover:hidden">{item.link.title}</span>
          <span
            className="hidden group-hover:inline"
            style={{ color: hoverText }}
          >
            {item.link.title}
          </span>
        </span>

        {/* Arrow — hidden by default, visible on hover */}
        <span
          className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: hoverText }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10.586 3.5a.999.999 0 0 1 1.707-.707l9.207 9.2-9.207 9.202a1 1 0 1 1-1.414-1.413L17.665 13H3.5a1 1 0 1 1 0-2h14.178l-6.799-6.794a.999.999 0 0 1-.293-.707z" />
          </svg>
        </span>
      </a>
    </li>
  );
}
