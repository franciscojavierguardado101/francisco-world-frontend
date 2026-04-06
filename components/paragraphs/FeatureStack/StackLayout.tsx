import { MediaItem } from '@/lib/paragraphs/utils';

interface Props {
  id: string;
  isRight: boolean;
  title: string;
  description: string;
  media: MediaItem | null;
  url: { uri: string; title: string } | null;
  textColor: string;
  subtextColor: string;
  buttonBg: string;
  buttonText: string;
  /** Optional slot rendered between description and button */
  children?: React.ReactNode;
}

export default function StackLayout({
  id,
  isRight,
  title,
  description,
  media,
  url,
  textColor,
  subtextColor,
  buttonBg,
  buttonText,
  children,
}: Props) {
  return (
    <div
      id={`stack-${id}`}
      style={{ scrollMarginTop: '76px' }}
      className="max-w-[1524px] mx-auto px-6 py-16"
    >
      <div
        className={[
          'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
          isRight ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : '',
        ].join(' ')}
      >
        {/* Text side */}
        <div className="flex flex-col gap-6">
          {title && (
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: textColor }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: subtextColor }}
            >
              {description}
            </p>
          )}

          {/* Slot for extra content e.g. checkmarks */}
          {children}

          {url && (
            <div className="mt-2">
              {(() => {
                const Tag = 'a' as any;
                return (
                  <Tag
                    href={url.uri}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: buttonBg, color: buttonText }}
                  >
                    {url.title || 'Learn more'}
                  </Tag>
                );
              })()}
            </div>
          )}
        </div>

        {/* Media side */}
        {media && (
          <div className="relative w-full aspect-square overflow-hidden">
            {media.type === 'video' ? (
              <video
                src={media.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={media.url}
                alt={media.alt ?? title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
