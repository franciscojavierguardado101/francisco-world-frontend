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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (!stacksWithCategories.length) return null;

  // Split into rows of COLS_PER_ROW
  const rows: StackItem[][] = [];
  for (let i = 0; i < stacksWithCategories.length; i += COLS_PER_ROW) {
    rows.push(stacksWithCategories.slice(i, i + COLS_PER_ROW));
  }

  return (
    <div className="max-w-[1524px] mx-auto px-6 pb-4">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="grid border-t border-b border-black/10"
          style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
        >
          {row.map((stack) => {
            const colorKey = stack.color ?? 'field_stack_c_b';
            const colors = STACK_COLOR_MAP[colorKey] ?? STACK_COLOR_MAP['field_stack_c_b'];

            return (
              <button
                key={stack.id}
                onClick={() => scrollToStack(stack.id)}
                className="group relative flex flex-col justify-between px-6 py-6 text-left transition-all duration-300 overflow-hidden border-r last:border-r-0 border-black/10"
                style={{ backgroundColor: colors.tabBg }}
              >
                {/* Hover fill — slides up from bottom */}
                <span
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"
                  style={{ backgroundColor: colors.hoverBg }}
                  aria-hidden="true"
                />

                {/* Content */}
                <span
                  className="relative z-10 text-base font-bold transition-colors duration-300"
                  style={{ color: colors.tabText }}
                >
                  <span className="group-hover:hidden inline">{stack.category}</span>
                  <span
                    className="hidden group-hover:inline"
                    style={{ color: colors.hoverText }}
                  >
                    {stack.category}
                  </span>
                </span>

                {/* Down arrow */}
                <svg
                  viewBox="0 0 24 24"
                  className="relative z-10 w-6 h-6 mt-6 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
