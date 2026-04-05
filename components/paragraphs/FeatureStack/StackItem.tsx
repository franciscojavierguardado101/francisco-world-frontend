import { StackItem as StackItemType, PARENT_COLOR_MAP } from './types';
import StackLayout from './StackLayout';

interface Props {
  stack: StackItemType;
  parentColor: string | null;
}

export default function StackItem({ stack, parentColor }: Props) {
  const colors = parentColor
    ? (PARENT_COLOR_MAP[parentColor] ?? PARENT_COLOR_MAP['field_feature_s_c_w'])
    : PARENT_COLOR_MAP['field_feature_s_c_w'];

  return (
    <StackLayout
      id={stack.id}
      isRight={stack.position === 'field_stack_r'}
      title={stack.title}
      description={stack.description}
      media={stack.media}
      url={stack.url}
      textColor={colors.text}
      subtextColor={colors.subtext}
      buttonBg={colors.text}
      buttonText={colors.buttonText}
    />
  );
}
