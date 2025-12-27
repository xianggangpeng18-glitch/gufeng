
export enum MoodCategory {
  JOY = '喜',
  SORROW = '哀',
  ANGER = '怒',
  LONGING = '思',
  PEACE = '静',
  MELANCHOLY = '愁',
  LOVE = '情',
  WILD = '狂'
}

export enum StyleTheme {
  NATURE = '山水寄情',
  SEASONS = '岁时轮转',
  TIME = '晨昏朝暮',
  ABSTRACT = '虚实幻境',
  CHIVALRY = '快意江湖'
}

export interface MoodSelection {
  category: MoodCategory;
  theme: StyleTheme;
  description: string;
  intensity: number; // 1-5
}

export interface GeneratedQuote {
  text: string;
  meaning?: string;
}
