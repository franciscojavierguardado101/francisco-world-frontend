process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  weight: number;
  parent: string | null;
  megamenu_style: string;
  image_url: string | null;
  description: string | null;
  text_size: 'display' | 'title' | 'body';
  children: MenuItem[];
}

export async function getMenu(menuName: string): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/fg-menu/${menuName}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Menu fetch error:', e);
    return [];
  }
}
