import { StackMarksItem as StackMarksItemType, PARENT_COLOR_MAP, STACK_MARKS_COLOR_MAP } from './types';

interface Props {
  stack: StackMarksItemType;
  parentColor: string | null;
}

function CheckmarkIcon({ checkBg, checkMark }: { checkBg: string; checkMark: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="20"
      height="20"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="8" fill={checkBg} />
      <path
        d="M11.748 6.03a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"
        fill={checkMark}
      />
    </svg>
  );
}

export default function StackMarksItem({ stack, parentColor }: Props) {
  const colors = parentColor
    ? (PARENT_COLOR_MAP[parentColor] ?? PARENT_COLOR_MAP['field_feature_s_c_w'])
    : PARENT_COLOR_MAP['field_feature_s_c_w'];

  const markColors = stack.color
    ? (STACK_MARKS_COLOR_MAP[stack.color] ?? STACK_MARKS_COLOR_MAP['field_stack_m_c_b'])
    : STACK_MARKS_COLOR_MAP['field_stack_m_c_b'];

  const isRight = stack.position === 'field_stack_m_r';

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

          {/* Checkmark details */}
          {stack.details.length > 0 && (
            <ul className="flex flex-col gap-3">
              {stack.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckmarkIcon
                    checkBg={markColors.checkBg}
                    checkMark={markColors.checkMark}
                  />
                  <span
                    className="text-base leading-relaxed"
                    style={{ color: colors.subtext }}
                  >
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA button */}
          {stack.url && (
            <div className="mt-2">
              {(() => {
                const Tag = 'a' as any;
                return (
                  <Tag
                    href={stack.url!.uri}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: colors.text, color: colors.buttonText }}
                  >
                    {stack.url!.title || 'Learn more'}
                  </Tag>
                );
              })()}
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
                alt={stack.media.alt ?? stack.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
