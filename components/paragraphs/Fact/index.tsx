import { FactData, FACT_COLOR_MAP } from './types';

interface Props {
  data: FactData;
}

export default function Fact({ data }: Props) {
  const colors = FACT_COLOR_MAP[data.color] ?? FACT_COLOR_MAP['field_fact_color_b'];
  const isRight = data.position === 'field_fact_pos_r';

  const leftCol = (
    <div className="flex flex-col gap-6">
      {data.title && (
        <h2
          className="text-5xl lg:text-6xl font-bold leading-tight"
          style={{ color: colors.text }}
        >
          {data.title}
        </h2>
      )}
      {data.desc && (
        <p
          className="text-base leading-relaxed max-w-sm"
          style={{ color: colors.text }}
        >
          {data.desc}
        </p>
      )}
    </div>
  );

  const rightCol = (
    <div className="flex flex-col gap-6">
      {data.quote && (
        <div className="flex flex-col gap-4">
          {/* Opening quote mark — matches Spotify design */}
          <span
            className="text-5xl font-bold leading-none"
            style={{ color: colors.text }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p
            className="text-lg lg:text-xl leading-relaxed font-medium"
            style={{ color: colors.text }}
          >
            {data.quote}
          </p>
        </div>
      )}
      {data.name && (
        <p
          className="text-xl font-bold"
          style={{ color: colors.text }}
        >
          &mdash;{data.name}
        </p>
      )}
      {data.detail && (
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: colors.text }}
        >
          {data.detail}
        </p>
      )}
    </div>
  );

  return (
    <section
      style={{ backgroundColor: colors.bg, paddingTop: '76px' }}
      className="w-full"
    >
      <div className="max-w-[1524px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {isRight ? (
            <>
              {rightCol}
              {leftCol}
            </>
          ) : (
            <>
              {leftCol}
              {rightCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
