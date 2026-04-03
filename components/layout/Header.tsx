'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/lib/menu';
import Logo from '@/components/Logo';
import MegamenuResolver from '@/components/megamenu/MegamenuResolver';

interface HeaderProps {
  mainNav: MenuItem[];
  actions: MenuItem[];
}

export default function Header({ mainNav, actions }: HeaderProps) {
  const [openMegamenu, setOpenMegamenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = mainNav.filter(i => i.title !== 'Home');
  const megamenuItem = navItems.find(i => i.title === openMegamenu);

  return (
    <>
      {openMegamenu && (
        <div
          className="fixed inset-0 top-[76px] z-30"
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.3)' }}
          onMouseEnter={() => setOpenMegamenu(null)}
          onClick={() => setOpenMegamenu(null)}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white h-[76px] flex items-center">
        <div className="w-full max-w-[1524px] mx-auto px-6 flex items-center gap-8">

          <Link href="/" onClick={() => { setOpenMegamenu(null); setMobileOpen(false); }} className="flex-shrink-0">
            <Logo variant="dark" />
          </Link>

          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <ul className="flex items-center gap-1">
              {navItems.map(item => (
                <li key={item.id} onMouseEnter={() => item.children.length > 0 ? setOpenMegamenu(item.title) : setOpenMegamenu(null)}>
                  {item.children.length > 0 ? (
                    <button className="relative px-4 py-2 text-sm font-bold transition-colors group">
                      <span className={openMegamenu === item.title ? 'text-white' : 'text-white/80 group-hover:text-white'}>
                        {item.title}
                      </span>
                      <span className={[
                        'absolute bottom-0 left-4 right-4 h-[2px] bg-white transition-opacity',
                        openMegamenu === item.title ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                      ].join(' ')} />
                    </button>
                  ) : (
                    <Link
                      href={item.url}
                      onClick={() => setOpenMegamenu(null)}
                      className="relative px-4 py-2 text-sm font-bold text-white/80 hover:text-white transition-colors block group"
                    >
                      {item.title}
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0 ml-auto">
            {actions.map((action, i) => (
              i === 0 ? (
                <Link key={action.id} href={action.url}
                  className="text-sm font-bold text-white px-5 py-[10px] rounded-full border border-white/40 hover:border-white transition-colors">
                  {action.title}
                </Link>
              ) : (
                <Link key={action.id} href={action.url}
                  className="text-sm font-bold bg-white text-black px-6 py-[10px] rounded-full hover:scale-[1.04] transition-transform">
                  {action.title}
                </Link>
              )
            ))}
          </div>

          <button className="lg:hidden text-white p-2 ml-auto" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            )}
          </button>
        </div>

        {openMegamenu && megamenuItem && (
          <div className="absolute top-[76px] left-0 right-0 bg-black text-white z-40 border-t border-white/10">
            <MegamenuResolver item={megamenuItem} onClose={() => setOpenMegamenu(null)} />
          </div>
        )}

        {mobileOpen && (
          <div className="lg:hidden absolute top-[76px] left-0 right-0 bg-black border-t border-white/10 z-40 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-1">
              {navItems.map(item => (
                <div key={item.id}>
                  {item.children.length > 0 ? (
                    <div>
                      <button
                        onClick={() => setOpenMegamenu(openMegamenu === item.title ? null : item.title)}
                        className="w-full text-left py-3 text-sm font-bold text-white border-b border-white/10 flex justify-between items-center"
                      >
                        {item.title}
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" style={{ opacity: 0.4 }}>
                          <path d="M8 10.94L2.53 5.47l1.06-1.06L8 8.82l4.41-4.41 1.06 1.06L8 10.94z"/>
                        </svg>
                      </button>
                      {openMegamenu === item.title && (
                        <div className="pl-4 py-3 space-y-5">
                          {item.children.map(column => (
                            <div key={column.id}>
                              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">{column.title}</p>
                              {column.children.map(child => (
                                <Link key={child.id} href={child.url}
                                  className="block py-2 text-sm font-bold text-white/70 hover:text-white transition-colors"
                                  onClick={() => { setMobileOpen(false); setOpenMegamenu(null); }}>
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.url} className="block py-3 text-sm font-bold text-white border-b border-white/10"
                      onClick={() => setMobileOpen(false)}>
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {actions.map((action, i) => (
                  <Link key={action.id} href={action.url}
                    className={i === 0
                      ? 'text-sm font-bold text-white text-center py-3 rounded-full border border-white/40'
                      : 'text-sm font-bold bg-white text-black text-center py-3 rounded-full'
                    }
                    onClick={() => setMobileOpen(false)}>
                    {action.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
