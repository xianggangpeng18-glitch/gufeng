
import React from 'react';
import { MoodCategory, StyleTheme } from './types';

export const MOOD_CATEGORIES = [
  { id: MoodCategory.JOY, label: '欢愉', icon: '✨', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: MoodCategory.SORROW, label: '悲悯', icon: '💧', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: MoodCategory.ANGER, label: '愤慨', icon: '🔥', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: MoodCategory.LONGING, label: '怀远', icon: '🌙', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: MoodCategory.PEACE, label: '淡泊', icon: '🍵', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: MoodCategory.MELANCHOLY, label: '忧思', icon: '🍂', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: MoodCategory.LOVE, label: '深情', icon: '🌸', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { id: MoodCategory.WILD, label: '纵逸', icon: '🐎', color: 'bg-stone-50 text-stone-700 border-stone-200' },
];

export const STYLE_THEMES = [
  { id: StyleTheme.NATURE, label: '山水寄情', desc: '以草木鱼虫喻心，借山川江河言志' },
  { id: StyleTheme.SEASONS, label: '岁时轮转', desc: '叹春花秋月之更迭，感时序之无常' },
  { id: StyleTheme.TIME, label: '晨昏朝暮', desc: '取一刻残阳，待半缕微光' },
  { id: StyleTheme.ABSTRACT, label: '虚实幻境', desc: '真假莫辨，如梦如幻，大音希声' },
  { id: StyleTheme.CHIVALRY, label: '快意江湖', desc: '凭一剑寒霜，饮尽浮生乱绪' },
];
