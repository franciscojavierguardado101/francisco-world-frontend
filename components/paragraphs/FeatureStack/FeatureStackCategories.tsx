'use client';

import { useCallback } from 'react';
import { StackItem, STACK_COLOR_MAP } from './types';

interface Props {
  stacks: StackItem[];
}

const COLS_PER_ROW = 5;

export default function FeatureStackCategories({ stacks }: Props) {
  const stacksWithCategories = stacks.filter(s => s.category);

  const scrollToStack = useCallback((id: string) => {
    const el = document.getElementById(`stack-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!stacksWithCategories.length) return null;

  const rows: StackItem[][] = [];
  for (let i = 0; i < stacksWithCategories.length; i += COLS_PER_ROW) {
    rows.push(stacksWithCategories.slice(i, i + COLS_PER_ROW));
  }

  return (
    <div className="max-w-[1524px] mx-auto px-6 py-4">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-wrap gap-0 mb-0">
          {row.map((stack) => {
            const colorKey = stack.color ?? 'field_stack_c_b';
            const colors = STACK_COLOR_MAP[colorKey] ?? STACK_COLOR_MAP['field_stack_c_b'];
            return (
              <button
                key={stack.id}
                onClick={() => scrollToStack(stack.id)}
                className="group relative flex flex-col justify-between px-0 py-6 pr-16 text-left overflow-hidden"
                style={{
                  backgroundColor: 'transparent',
                  marginRight: '2.5rem',
                }}
              >
                {/* Top color line */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] transition-colors duration-200"
                  style={{ backgroundColor: colors.tabArrow }}
                />

                {/* Hover background fill from top */}
                <span
                  className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"
                  style={{ backgroundColor: colors.hoverBg }}
                  aria-hidden="true"
                />

                {/* Category label */}
                <span
                  className="relative z-10 text-sm font-bold whitespace-nowrap group-hover:transition-colors duration-200"
                  style={{ color: colors.tabText }}
                >
                  {stack.category}
                </span>

                {/* Down arrow */}
                <svg
                  viewBox="0 0 24 24"
                  className="relative z-10 w-5 h-5 mt-4"
                  fill="currentColor"
                  style={{ color: colors.tabArrow }}
                >
                  <path d="M3.5 10.586a1 1 0 0 0-.707 1.707l9.2 9.207 9.202-9.207a1 1 0 1 0-1.413-1.414L13 17.665V3.5a1 1 0 1 0-2 0v14.178l-6.794-6.8a1 1 0 0 0-.707-.292z" />
                </svg>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
