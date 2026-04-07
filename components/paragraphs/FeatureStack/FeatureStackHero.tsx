import { FeatureStackData, PARENT_COLOR_MAP } from './types';

interface Props {
  data: FeatureStackData;
}

export default function FeatureStackHero({ data }: Props) {
  const colors = data.color ? PARENT_COLOR_MAP[data.color] : PARENT_COLOR_MAP['field_feature_s_c_w'];
  const isRight = data.position === 'field_feature_s_pos_r';

  return (
    <div
      className={[
        'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
        'max-w-[1524px] mx-auto px-6 pt-20 pb-10',
        isRight ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : '',
      ].join(' ')}
    >
      {/* Text side */}
      <div className="flex flex-col gap-6">
        {data.title && (
          <h1
            className="text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: colors.text }}
          >
            {data.title}
          </h1>
        )}
        {data.description && (
          <p
            className="text-lg leading-relaxed max-w-xl"
            style={{ color: colors.subtext }}
          >
            {data.description}
          </p>
        )}
      </div>

      {/* Media side */}
      {data.media && (
        <div className="relative w-full aspect-video overflow-hidden">
          {data.media.type === 'video' ? (
            <video
              src={data.media.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={data.media.url}
              alt={data.media.alt || data.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}
