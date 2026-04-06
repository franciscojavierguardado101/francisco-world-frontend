'use client';

import { useState } from 'react';
import { ArtisticCarouselData, ARTISTIC_CAROUSEL_COLOR_MAP } from './types';

interface Props {
  data: ArtisticCarouselData;
}

function ArrowLeft({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" style={{ color }}>
      <path d="M13.414 3.5a.999.999 0 0 0-1.707-.707l-9.207 9.2 9.207 9.202a1 1 0 1 0 1.414-1.413L6.335 13H20.5a1 1 0 0 0 0-2H6.322l6.799-6.794a.999.999 0 0 0 .293-.707z" />
    </svg>
  );
}

function ArrowRight({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" style={{ color }}>
      <path d="M10.586 3.5a.999.999 0 0 1 1.707-.707l9.207 9.2-9.207 9.202a1 1 0 1 1-1.414-1.413L17.665 13H3.5a1 1 0 1 1 0-2h14.178l-6.799-6.794a.999.999 0 0 1-.293-.707z" />
    </svg>
  );
}

export default function ArtisticCarousel({ data }: Props) {
  const colors = ARTISTIC_CAROUSEL_COLOR_MAP[data.color] ?? ARTISTIC_CAROUSEL_COLOR_MAP['field_art_c_color_w'];
  const [current, setCurrent] = useState(0);
  const total = data.cards.length;

  if (total === 0) return null;

  // Ouroboros navigation — wraps around infinitely
  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const goNext = () => setCurrent((prev) => (prev + 1) % total);

  const card = data.cards[current];
  const isRight = card.position === 'field_art_c_pos_r';

  const mediaCol = (
    <div className="flex flex-col gap-6">
      {/* Media */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
        {card.media ? (
          card.media.type === 'video' ? (
            <video
              src={card.media.url}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
          ) : (
            <img
              src={card.media.url}
              alt={card.media.alt ?? card.title}
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
          )
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: 'rgba(128,128,128,0.2)' }} />
        )}
      </div>

      {/* Navigation: prev arrow, next arrow, counter */}
      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          aria-label="Previous card"
          className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity hover:opacity-70"
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft color={colors.text} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next card"
          className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity hover:opacity-70"
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <ArrowRight color={colors.text} />
        </button>
        {/* Dynamic counter — never hardcoded */}
        <span
          className="text-sm font-bold"
          style={{ color: colors.text }}
        >
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );

  const textCol = (
    <div className="flex flex-col gap-6 justify-center">
      {card.title && (
        <h2
          className="text-2xl lg:text-3xl font-bold leading-tight"
          style={{ color: colors.text }}
        >
          {card.title}
        </h2>
      )}
      {card.desc && (
        <p
          className="text-base lg:text-lg leading-relaxed"
          style={{ color: colors.text }}
        >
          {card.desc}
        </p>
      )}
    </div>
  );

  return (
    <section
      style={{ backgroundColor: colors.bg, paddingTop: '76px' }}
      className="w-full"
    >
      <div className="max-w-[1524px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {isRight ? (
            <>
              {textCol}
              {mediaCol}
            </>
          ) : (
            <>
              {mediaCol}
              {textCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
