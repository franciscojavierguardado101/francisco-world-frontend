'use client';

import Link from 'next/link';
import { MenuItem } from '@/lib/menu';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

const TEXT_SIZE_CLASSES: Record<string, string> = {
  display: 'text-4xl font-bold text-white',
  title: 'text-2xl font-bold text-white',
  body: 'text-sm font-bold text-white/80 hover:text-white',
};

export default function MegamenuColumns({ item, onClose }: Props) {
  return (
    <div className="max-w-[1524px] mx-auto px-6 py-10">
      <div className="grid grid-cols-4 gap-8">
        {item.children.map(column => (
          <div key={column.id}>
            <span className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
              {column.title}
            </span>
            <nav className="space-y-3">
              {column.children.map(child => (
                <div key={child.id}>
                  <Link href={child.url} onClick={onClose} className="block group relative">
                    <span className={[
                      'relative inline-block transition-colors duration-150',
                      TEXT_SIZE_CLASSES[child.text_size] ?? TEXT_SIZE_CLASSES.body,
                      'after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-white group-hover:after:w-full after:transition-all after:duration-200',
                    ].join(' ')}>
                      {child.title}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}
