import { StackMarksItem as StackMarksItemType, PARENT_COLOR_MAP, STACK_MARKS_COLOR_MAP } from './types';
import StackLayout from './StackLayout';

interface Props {
  stack: StackMarksItemType;
  parentColor: string | null;
}

function CheckmarkIcon({ checkBg, checkMark }: { checkBg: string; checkMark: string }) {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" style={{ flexShrink: 0 }}>
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

  // When checkMark is 'inherit', use the parent Feature Stack background color.
  // This lets Lavender (and any future color) transparently adopt the section background.
  const resolvedCheckMark = markColors.checkMark === 'inherit'
    ? colors.bg
    : markColors.checkMark;

  return (
    <StackLayout
      id={stack.id}
      isRight={stack.position === 'field_stack_m_r'}
      title={stack.title}
      description={stack.description}
      media={stack.media}
      url={stack.url}
      textColor={colors.text}
      subtextColor={colors.subtext}
      buttonBg={colors.text}
      buttonText={colors.buttonText}
    >
      {stack.details.length > 0 && (
        <ul className="flex flex-col gap-3">
          {stack.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckmarkIcon checkBg={markColors.checkBg} checkMark={resolvedCheckMark} />
              <span className="text-base leading-relaxed" style={{ color: colors.subtext }}>
                {detail}
              </span>
            </li>
          ))}
        </ul>
      )}
    </StackLayout>
  );
}
