export interface StackMediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

export interface StackItem {
  id: string;
  type: 'paragraph--stack';
  category: string;
  title: string;
  description: string;
  url: { uri: string; title: string } | null;
  media: StackMediaItem | null;
  position: 'field_stack_l' | 'field_stack_r' | null;
  color: 'field_stack_c_s' | 'field_stack_c_cr' | 'field_stack_c_b' | 'field_stack_c_l_g' | 'field_stack_c_l' | null;
}

export interface StackMarksItem {
  id: string;
  type: 'paragraph--stack_marks';
  category: string;
  title: string;
  description: string;
  details: string[]; // up to 5 detail strings
  url: { uri: string; title: string } | null;
  media: StackMediaItem | null;
  position: 'field_stack_m_l' | 'field_stack_m_r' | null;
  color: 'field_stack_m_c_s' | 'field_stack_m_c_cr' | 'field_stack_m_c_b' | 'field_stack_m_c_l_g' | 'field_stack_m_c_l' | null;
}

export interface FeatureStackData {
  id: string;
  title: string;
  description: string;
  media: StackMediaItem | null;
  position: 'field_feature_s_pos_l' | 'field_feature_s_pos_r' | null;
  color: string | null;
  stacks: (StackItem | StackMarksItem)[];
}

// Parent section background colors — keyed by Drupal list_string value
// bg: section background, text: headings/buttons, subtext: body copy, buttonText: button label
export const PARENT_COLOR_MAP: Record<string, {
  bg: string;
  text: string;
  subtext: string;
  buttonText: string;
}> = {
  field_feature_s_c_w: { bg: '#ffffff', text: '#000000', subtext: '#333333', buttonText: '#ffffff' },
  field_feature_s_c_b: { bg: '#000000', text: '#ffffff', subtext: '#aaaaaa', buttonText: '#000000' },
  field_feature_s_c_a: { bg: '#C8E0FC', text: '#000000', subtext: '#1d2b3a', buttonText: '#C8E0FC' },
  field_feature_s_c_i: { bg: '#6443f5', text: '#ffffff', subtext: '#d4ccff', buttonText: '#6443f5' },
  field_feature_s_c_c: { bg: '#3d2940', text: '#ffffff', subtext: '#c9b8d0', buttonText: '#3d2940' },
  field_feature_s_c_o: { bg: '#414d1e', text: '#ffffff', subtext: '#c8d49a', buttonText: '#414d1e' },
  field_feature_s_c_r: { bg: '#01392c', text: '#ffffff', subtext: '#80c4a8', buttonText: '#01392c' },
};

// Stack Marks color map — controls category tabs AND checkmark colors
// checkBg: circle background, checkMark: tick color inside the circle
export const STACK_MARKS_COLOR_MAP: Record<string, {
  tabBg: string;
  tabText: string;
  tabArrow: string;
  hoverBg: string;
  hoverText: string;
  checkBg: string;
  checkMark: string;
}> = {
  field_stack_m_c_s: {
    tabBg: '#1d2b3a',
    tabText: 'rgb(130, 161, 192)',
    tabArrow: 'rgb(130, 161, 192)',
    hoverBg: '#1d2b3a',
    hoverText: 'rgb(130, 161, 192)',
    checkBg: 'rgb(130, 161, 192)',
    checkMark: '#1d2b3a',
  },
  field_stack_m_c_cr: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: 'rgb(254, 72, 52)',
    hoverBg: 'rgb(254, 72, 52)',
    hoverText: '#ffffff',
    checkBg: 'rgb(254, 72, 52)',
    checkMark: '#000000',
  },
  field_stack_m_c_b: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: '#000000',
    hoverBg: '#000000',
    hoverText: '#ffffff',
    checkBg: '#000000',
    checkMark: '#ffffff',
  },
  field_stack_m_c_l_g: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: '#000000',
    hoverBg: 'rgb(207, 245, 106)',
    hoverText: '#000000',
    checkBg: 'rgb(207, 245, 106)',
    checkMark: '#000000',
  },
  field_stack_m_c_l: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: '#000000',
    hoverBg: 'rgb(175, 147, 196)',
    hoverText: '#000000',
    checkBg: 'rgb(175, 147, 196)',
    checkMark: 'inherit', // resolved at render time from parent Feature Stack background color
  },
};

// Child category tab color schemes — keyed by Drupal list_string value
export const STACK_COLOR_MAP: Record<string, {
  tabBg: string;
  tabText: string;
  tabArrow: string;
  hoverBg: string;
  hoverText: string;
}> = {
  field_stack_c_s: {
    tabBg: '#1d2b3a',
    tabText: 'rgb(130, 161, 192)',
    tabArrow: 'rgb(130, 161, 192)',
    hoverBg: '#1d2b3a',
    hoverText: 'rgb(130, 161, 192)',
  },
  field_stack_c_cr: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: 'rgb(254, 72, 52)',  // top line = accent color always
    hoverBg: 'rgb(254, 72, 52)',
    hoverText: '#ffffff',
  },
  field_stack_c_l_g: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: '#000000',
    hoverBg: 'rgb(207, 245, 106)',
    hoverText: '#000000',
  },
  field_stack_c_l: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: '#000000',
    hoverBg: 'rgb(175, 147, 196)',
    hoverText: '#000000',
  },
  field_stack_c_b: {
    tabBg: 'transparent',
    tabText: '#000000',
    tabArrow: '#000000',
    hoverBg: '#000000',
    hoverText: '#ffffff',
  },
};
