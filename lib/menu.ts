process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  weight: number;
  parent: string | null;
  children?: MenuItem[];
}

export async function getMenu(menuName: string): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/menu_items/${menuName}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const items: MenuItem[] = data.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      url: item.attributes.url,
      weight: item.attributes.weight,
      parent: item.attributes.parent ?? null,
    }));
    return items;
  } catch {
    return [];
  }
}
