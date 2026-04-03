import { getMenu } from '@/lib/menu';
import Header from './Header';
import Footer from './Footer';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mainNav, actions, footerMenu] = await Promise.all([
    getMenu('main'),
    getMenu('header-actions'),
    getMenu('footer'),
  ]);

  return (
    <>
      <Header mainNav={mainNav} actions={actions} />
      <div className="pt-[76px]">{children}</div>
      <Footer footerMenu={footerMenu} />
    </>
  );
}
