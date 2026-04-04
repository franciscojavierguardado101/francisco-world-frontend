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

  // Use first stack's color for the top line — all tabs in a row share the same color scheme
  const firstColorKey = stacksWithCategories[0]?.color ?? 'field_stack_c_b';
  const firstColors = STACK_COLOR_MAP[firstColorKey] ?? STACK_COLOR_MAP['field_stack_c_b'];

  return (
    <div className="w-full">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="max-w-[1524px] mx-auto px-6 relative">
          {/* Single top line spanning full width */}
          <div
            className="absolute top-0 left-6 right-6 h-[3px]"
            style={{ backgroundColor: firstColors.hoverBg }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${row.length}, 1fr)`,
            }}
          >
            {row.map((stack) => {
              const colorKey = stack.color ?? 'field_stack_c_b';
              const colors = STACK_COLOR_MAP[colorKey] ?? STACK_COLOR_MAP['field_stack_c_b'];
              return (
                <button
                  key={stack.id}
                  onClick={() => scrollToStack(stack.id)}
                  className="group relative flex flex-col justify-between text-left overflow-hidden"
                  style={{
                    height: '98px',
                    padding: '16px 32px 16px 32px',
                    backgroundColor: 'transparent',
                  }}
                >
                  {/* Per-tab hover background fill from top */}
                  <span
                    className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"
                    style={{ backgroundColor: colors.hoverBg }}
                    aria-hidden="true"
                  />

                  {/* Category label */}
                  <span
                    className="relative z-10 text-3xl font-bold leading-tight group-hover:text-white transition-colors duration-300"
                    style={{ color: colors.tabText }}
                  >
                    {stack.category}
                  </span>

                  {/* Arrow — hidden by default, visible on hover in white */}
                  <svg
                    viewBox="0 0 24 24"
                    className="relative z-10 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="currentColor"
                    style={{ color: '#ffffff' }}
                  >
                    <path d="M3.5 10.586a1 1 0 0 0-.707 1.707l9.2 9.207 9.202-9.207a1 1 0 1 0-1.413-1.414L13 17.665V3.5a1 1 0 1 0-2 0v14.178l-6.794-6.8a1 1 0 0 0-.707-.292z" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
