import { FeatureStackData, PARENT_COLOR_MAP } from './types';
import FeatureStackHero from './FeatureStackHero';
import FeatureStackCategories from './FeatureStackCategories';
import StackItem from './StackItem';
import StackMarksItem from './StackMarksItem';

interface Props {
  data: FeatureStackData;
}

export default function FeatureStack({ data }: Props) {
  const colors = data.color
    ? (PARENT_COLOR_MAP[data.color] ?? PARENT_COLOR_MAP['field_feature_s_c_w'])
    : PARENT_COLOR_MAP['field_feature_s_c_w'];

  return (
    <section style={{ backgroundColor: colors.bg, paddingTop: '76px' }} className="w-full">
      <FeatureStackHero data={data} />

      {data.stacks.length > 0 && (
        <FeatureStackCategories stacks={data.stacks} />
      )}

      {data.stacks.map((stack) => {
        if (stack.type === 'paragraph--stack_marks') {
          return (
            <StackMarksItem
              key={stack.id}
              stack={stack}
              parentColor={data.color}
            />
          );
        }
        return (
          <StackItem
            key={stack.id}
            stack={stack}
            parentColor={data.color}
          />
        );
      })}
    </section>
  );
}
