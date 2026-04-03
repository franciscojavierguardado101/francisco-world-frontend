import { MenuItem } from '@/lib/menu';
import MegamenuColumns from './MegamenuColumns';
import MegamenuGallery from './MegamenuGallery';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

export default function MegamenuResolver({ item, onClose }: Props) {
  switch (item.megamenu_style) {
    case 'gallery':
      return <MegamenuGallery item={item} onClose={onClose} />;
    case 'columns':
    default:
      return <MegamenuColumns item={item} onClose={onClose} />;
  }
}
