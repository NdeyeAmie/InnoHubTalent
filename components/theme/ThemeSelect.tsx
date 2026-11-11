'use client';

import { useTheme } from '@/hooks/useTheme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const themeColors = [
  { value: 'light', label: 'Défaut / Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'red', label: 'Rouge' },
  { value: 'purple', label: 'Violet' },
  { value: 'green', label: 'Vert' },
  { value: 'blue', label: 'Bleu' },
  { value: 'pink', label: 'Rose' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Jaune' },
];

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Select onValueChange={setTheme} value={theme}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Choisir thème" />
      </SelectTrigger>
      <SelectContent>
        {themeColors.map((color) => (
          <SelectItem key={color.value} value={color.value}>
            {color.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
