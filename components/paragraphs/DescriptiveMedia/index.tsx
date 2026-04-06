import { DescriptiveMediaData, DESC_MEDIA_COLOR_MAP } from './types';

interface Props {
  data: DescriptiveMediaData;
}

export default function DescriptiveMedia({ data }: Props) {
  const colors = DESC_MEDIA_COLOR_MAP[data.color] ?? DESC_MEDIA_COLOR_MAP['field_desc_m_c_b'];
  const isRight = data.position === 'field_desc_m_pos_r';

  const textCol = (
    <div className="flex flex-col gap-6 justify-center py-10 lg:py-0">
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
          className="text-4xl lg:text-5xl font-bold leading-tight"
          style={{ color: colors.text }}
        >
          {data.title}
        </h2>
      )}
      {data.desc && (
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: colors.text }}
        >
          {data.desc}
        </p>
      )}
      {data.url && (
        <div className="mt-2">
          {(() => {
            const Tag = 'a' as any;
            return (
              <Tag
                href={data.url!.uri}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105"
                style={{
                  backgroundColor: colors.btnBg,
                  color: colors.btnText,
                  textDecoration: 'none',
                }}
              >
                {data.url!.title || 'Learn more'}
              </Tag>
            );
          })()}
        </div>
      )}
    </div>
  );

  const mediaCol = (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
      {data.media ? (
        data.media.type === 'video' ? (
          <video
            src={data.media.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        ) : (
          <img
            src={data.media.url}
            alt={data.media.alt ?? data.title}
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        )
      ) : null}
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
              {mediaCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {mediaCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
