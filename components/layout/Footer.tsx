import Link from 'next/link';
import { MenuItem } from '@/lib/menu';
import Logo from '@/components/Logo';

interface FooterProps {
  footerMenu: MenuItem[];
}

const SOCIAL_TITLES = ['Instagram', 'Twitter', 'LinkedIn', 'TikTok'];
const LEGAL_TITLES = ['Legal', 'Privacy', 'Cookies'];

function SocialIcon({ title }: { title: string }) {
  if (title === 'Instagram') return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 3.803c2.67 0 2.986.01 4.041.059.975.044 1.504.207 1.857.344.435.16.828.416 1.151.748.332.323.588.716.748 1.151.137.353.3.882.345 1.857.047 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.041-.045.975-.208 1.505-.345 1.857A3.315 3.315 0 0 1 17.9 19.8c-.352.137-.882.3-1.856.344-1.055.048-1.371.058-4.041.058-2.67 0-2.987-.01-4.041-.058-.975-.044-1.505-.207-1.857-.344a3.096 3.096 0 0 1-1.151-.748 3.096 3.096 0 0 1-.749-1.151c-.137-.353-.3-.883-.344-1.857-.048-1.055-.058-1.371-.058-4.041 0-2.67.01-2.987.058-4.041.045-.975.207-1.505.344-1.857a3.08 3.08 0 0 1 .749-1.151 3.096 3.096 0 0 1 1.15-.749c.353-.137.883-.3 1.858-.344 1.054-.048 1.37-.058 4.04-.058H12zM12.002 2c-2.716 0-3.057.012-4.124.06-1.066.05-1.793.22-2.428.466A4.91 4.91 0 0 0 3.678 3.68a4.91 4.91 0 0 0-1.153 1.772c-.247.635-.416 1.363-.465 2.427C2.012 8.943 2 9.286 2 12.002c0 2.715.012 3.056.06 4.123.05 1.066.218 1.791.465 2.426a4.909 4.909 0 0 0 1.153 1.772c.5.508 1.105.902 1.772 1.153.635.248 1.363.417 2.428.465 1.064.049 1.407.06 4.123.06s3.056-.01 4.123-.06c1.067-.049 1.79-.217 2.426-.465a5.111 5.111 0 0 0 2.925-2.925c.247-.635.416-1.363.465-2.427.048-1.064.06-1.407.06-4.123s-.012-3.057-.06-4.123c-.05-1.067-.218-1.791-.465-2.426a4.902 4.902 0 0 0-1.153-1.771 4.91 4.91 0 0 0-1.772-1.155c-.635-.247-1.363-.416-2.428-.464-1.064-.048-1.406-.06-4.122-.06L12.002 2z"/>
      <path d="M12 6.867a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.47a3.334 3.334 0 1 1 0-6.67 3.334 3.334 0 0 1 0 6.67zm5.338-7.473a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/>
    </svg>
  );
  if (title === 'Twitter') return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M13.676 10.622 20.233 3h-1.554l-5.694 6.618L8.438 3H3.193l6.877 10.007L3.193 21h1.554l6.013-6.989L15.562 21h5.245l-7.132-10.378Zm-2.129 2.474-.696-.997-5.544-7.93h2.387l4.474 6.4.696.996 5.815 8.319h-2.386l-4.746-6.788Z"/>
    </svg>
  );
  if (title === 'LinkedIn') return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="m2 3.433c0-.791.658-1.433 1.469-1.433h16.937c.811 0 1.469.642 1.469 1.433v17.134c0 .791-.658 1.433-1.469 1.433H3.47C2.658 22 2 21.358 2 20.567zm6.024 15.31v-9.032H5.022v9.031zm-1.501-10.264c1.047 0 1.698-.694 1.698-1.56-.02-.887-.651-1.56-1.678-1.56-1.027 0-1.698.674-1.698 1.56 0 .867.651 1.56 1.659 1.56h.019zm6.164 10.263h-3.002s.04-8.184 0-9.031h3.002v1.279c.399-.616 1.113-1.491 2.705-1.491 1.975 0 3.456 1.291 3.456 4.065v5.178h-3.002v-4.832c0-1.213-.434-2.042-1.52-2.042-.83 0-1.323.559-1.54 1.098-.08.193-.099.463-.099.733zm.001-7.753v.031h-.02l.02-.031z"/>
    </svg>
  );
  if (title === 'TikTok') return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M17 2a4.313 4.313 0 0 0 4.313 4.313v2a6.296 6.296 0 0 1-4.688-2.085v8.864c-.008 2.092-.671 3.85-1.82 5.098-1.159 1.257-2.758 1.935-4.492 1.935a6.312 6.312 0 1 1 0-12.625v2a4.313 4.313 0 0 0 0 8.625c1.199 0 2.256-.46 3.02-1.29.767-.832 1.292-2.096 1.292-3.781V2H17z"/>
    </svg>
  );
  return <span className="text-xs">{title[0]}</span>;
}

function SocialLink({ item }: { item: MenuItem }) {
  return (
    <SocialLinkInner href={item.url} label={item.title}>
      <SocialIcon title={item.title} />
    </SocialLinkInner>
  );
}

function SocialLinkInner({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const Tag = 'a' as any;
  return (
    <Tag
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
    >
      {children}
    </Tag>
  );
}

export default function Footer({ footerMenu }: FooterProps) {
  const columns = footerMenu.filter(
    item => !SOCIAL_TITLES.includes(item.title) && !LEGAL_TITLES.includes(item.title) && item.url === '#'
  );
  const legalLinks = footerMenu.filter(item => LEGAL_TITLES.includes(item.title));
  const socialLinks = footerMenu.filter(item => SOCIAL_TITLES.includes(item.title));

  return (
    <footer className="bg-[#121212] text-white pt-14 pb-6">
      <div className="max-w-[1524px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 mb-10">

          {/* Logo — far left */}
          <div className="flex-shrink-0 lg:w-40">
            <Link href="/">
              <Logo variant="dark" />
            </Link>
          </div>

          {/* Link columns — next to logo */}
          <div className="flex flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {columns.map(column => (
                <div key={column.id}>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-5">
                    {column.title}
                  </p>
                  <ul className="space-y-3">
                    {column.children.map(child => (
                      <li key={child.id}>
                        <Link href={child.url} className="text-sm text-white/70 hover:text-white transition-colors">
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Social icons — far right */}
          <div className="flex lg:flex-row gap-3 flex-shrink-0">
            {socialLinks.map(item => (
              <SocialLink key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {String.fromCharCode(169)} {new Date().getFullYear()} Francisco Guardado. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map(item => (
              <Link key={item.id} href={item.url} className="text-xs text-white/50 hover:text-white transition-colors">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
