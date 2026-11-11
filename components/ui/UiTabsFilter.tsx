import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type Option = { value: string; label: string };
type CountItem = { [key: string]: any; _count: { [key: string]: number } };

interface UiTabsFilterProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  options: Option[];
  stats?: CountItem[];
  statsKey: string;
  total?: number;
}

export function UiTabsFilter({
  activeTab,
  setActiveTab,
  options,
  stats,
  statsKey,
  total = 0,
}: UiTabsFilterProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="ALL">
          Tous
          <Badge variant="default" className="ml-2">
            {total}
          </Badge>
        </TabsTrigger>

        {options.map((opt) => {
          const count =
            stats?.find((item) => item[statsKey] === opt.value)?._count[
              statsKey
            ] ?? 0;

          return (
            <TabsTrigger key={opt.value} value={opt.value}>
              {opt.label}
              <Badge variant="default" className="ml-2">
                {count}
              </Badge>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
