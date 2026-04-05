import { SimpleMediaData, SIMPLE_MEDIA_COLOR_MAP } from './types';

interface Props {
  data: SimpleMediaData;
}

export default function SimpleMedia({ data }: Props) {
  const colors = SIMPLE_MEDIA_COLOR_MAP[data.color] ?? SIMPLE_MEDIA_COLOR_MAP['field_simple_m_c_w'];

  return (
    <section
      style={{ backgroundColor: colors.bg }}
      className="w-full"
    >
      <div
        className="max-w-[1524px] mx-auto"
        style={{ padding: '4px 40px' }}
      >
        {data.media && (
          <div className="w-full overflow-hidden">
            {data.media.type === 'video' ? (
              <video
                src={data.media.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
            ) : (
              <img
                src={data.media.url}
                alt={data.media.alt ?? ''}
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
