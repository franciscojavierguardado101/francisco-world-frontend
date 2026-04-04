'use client';

import { useCallback } from 'react';
import { StackItem, StackMarksItem, STACK_COLOR_MAP, STACK_MARKS_COLOR_MAP } from './types';

interface Props {
  stacks: (StackItem | StackMarksItem)[];
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
    <div className="w-full">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="max-w-[1524px] mx-auto px-6">
          {/* Desktop: horizontal grid */}
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: `repeat(${row.length}, 1fr)`,
              gap: '24px',
            }}
          >
            {row.map((stack) => {
              const isMarks = stack.type === 'paragraph--stack_marks';
              const colorKey = stack.color ?? (isMarks ? 'field_stack_m_c_b' : 'field_stack_c_b');
              const colorMap = isMarks ? STACK_MARKS_COLOR_MAP : STACK_COLOR_MAP;
              const fallback = isMarks ? 'field_stack_m_c_b' : 'field_stack_c_b';
              const colors = colorMap[colorKey] ?? colorMap[fallback];
              return (
                <button
                  key={stack.id}
                  onClick={() => scrollToStack(stack.id)}
                  className="group relative flex flex-col justify-between text-left overflow-hidden"
                  style={{
                    height: '98px',
                    padding: '16px 0 16px 0',
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                  }}
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: colors.hoverBg }} />
                  <span
                    className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"
                    style={{ backgroundColor: colors.hoverBg }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative z-10 text-3xl font-bold leading-tight group-hover:text-white transition-colors duration-300 pl-8"
                    style={{ color: colors.tabText }}
                  >
                    {stack.category}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="relative z-10 w-6 h-6 ml-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="currentColor"
                    style={{ color: colors.hoverText }}
                  >
                    <path d="M3.5 10.586a1 1 0 0 0-.707 1.707l9.2 9.207 9.202-9.207a1 1 0 1 0-1.413-1.414L13 17.665V3.5a1 1 0 1 0-2 0v14.178l-6.794-6.8a1 1 0 0 0-.707-.292z" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex flex-col md:hidden gap-0">
            {row.map((stack) => {
              const isMarks = stack.type === 'paragraph--stack_marks';
              const colorKey = stack.color ?? (isMarks ? 'field_stack_m_c_b' : 'field_stack_c_b');
              const colorMap = isMarks ? STACK_MARKS_COLOR_MAP : STACK_COLOR_MAP;
              const fallback = isMarks ? 'field_stack_m_c_b' : 'field_stack_c_b';
              const colors = colorMap[colorKey] ?? colorMap[fallback];
              return (
                <button
                  key={`mob-${stack.id}`}
                  onClick={() => scrollToStack(stack.id)}
                  className="relative flex flex-row items-center justify-between text-left w-full border-b border-black/10"
                  style={{
                    padding: '20px 0',
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                  }}
                >
                  {/* Left accent bar */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ backgroundColor: colors.hoverBg }}
                  />
                  <span
                    className="text-xl font-bold pl-6"
                    style={{ color: colors.tabText }}
                  >
                    {stack.category}
                  </span>
                  {/* Arrow pointing down on mobile */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    style={{ color: colors.hoverBg }}
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
