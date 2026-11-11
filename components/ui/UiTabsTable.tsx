import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type Option = { value: string; label: string };
type CountItem = { [key: string]: any; _count: { [key: string]: number } };

interface UiTabsProps {
  columnId: string;
  table: any;
  options: Option[];
  stats?: CountItem[];
  statsKey: string;
  total?: number;
}

export function UiTabs({
  columnId,
  table,
  options,
  stats,
  statsKey,
  total = 0,
}: UiTabsProps) {
  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) =>
        table.getColumn(columnId)?.setFilterValue(value === 'all' ? '' : value)
      }
    >
      <TabsList>
        <TabsTrigger value="all">
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
