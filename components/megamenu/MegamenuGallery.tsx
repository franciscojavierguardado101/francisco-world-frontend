'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/lib/menu';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

const TEXT_SIZE_CLASSES: Record<string, string> = {
  display: 'text-4xl font-bold text-white leading-tight',
  title: 'text-2xl font-bold text-white/60 leading-tight',
  body: 'text-sm font-bold text-white/60 group-hover:text-white',
};

export default function MegamenuGallery({ item, onClose }: Props) {
  const allLeafItems = item.children.flatMap(col =>
    col.children.length > 0 ? col.children : [col]
  );
  const itemsWithImages = allLeafItems.filter(i => i.image_url);
  const defaultItem = itemsWithImages[0] ?? allLeafItems[0] ?? null;
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(defaultItem);

  const activeImage = hoveredItem?.image_url ?? defaultItem?.image_url ?? null;
  const activeDescription = hoveredItem?.description ?? defaultItem?.description ?? null;

  return (
    <div className="max-w-[1524px] mx-auto px-6 py-10">
      <div className="grid grid-cols-2 gap-12">

        {/* Left: columns + description stacked */}
        <div className="flex flex-col justify-between" style={{ minHeight: '340px' }}>

          {/* Columns grid */}
          <div className="grid grid-cols-2 gap-x-16">
            {item.children.map(column => (
              <div key={column.id} className="mb-6">
                <p className="text-sm text-white/40 mb-5">{column.title}</p>
                <nav className="space-y-4">
                  {column.children.map(child => (
                    <div key={child.id}>
                      <Link
                        href={child.url}
                        onClick={onClose}
                        onMouseEnter={() => setHoveredItem(child)}
                        className="block group relative"
                      >
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

          {/* Description — bottom left, full width, white, Spotify style */}
          {activeDescription && (
            <div className="mt-6 col-span-4">
              <p className="text-sm text-white leading-relaxed">
                {activeDescription}
              </p>
            </div>
          )}
        </div>

        {/* Right: image — sharp edges, fills the space */}
        <div className="flex items-stretch">
          {activeImage && (
            <div className="w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={activeImage}
                alt={hoveredItem?.title ?? ''}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
