import { StackItem as StackItemType, PARENT_COLOR_MAP } from './types';

interface Props {
  stack: StackItemType;
  parentColor: string | null;
}

export default function StackItem({ stack, parentColor }: Props) {
  const colors = parentColor ? PARENT_COLOR_MAP[parentColor] : PARENT_COLOR_MAP['field_feature_s_c_w'];
  const isRight = stack.position === 'field_stack_r';

  return (
    <div
      id={`stack-${stack.id}`}
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
          {stack.title && (
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: colors.text }}
            >
              {stack.title}
            </h2>
          )}
          {stack.description && (
            <p
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: colors.subtext }}
            >
              {stack.description}
            </p>
          )}
          {stack.url && (
            <div className="mt-2">
              
                href={stack.url.uri}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105"
                style={{
                  backgroundColor: colors.text,
                  color: colors.bg,
                }}
              >
                {stack.url.title || 'Learn more'}
              </a>
            </div>
          )}
        </div>

        {/* Media side */}
        {stack.media && (
          <div className="relative w-full aspect-square overflow-hidden">
            {stack.media.type === 'video' ? (
              <video
                src={stack.media.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={stack.media.url}
                alt={stack.media.alt || stack.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
