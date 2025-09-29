export type ChartDataItem = {
  label: string;
  value: number;
  color?: string; // optional, can use default color if not provided
};

export type Widget = {
  id: string;
  name: string;
  chartData?: ChartDataItem[];
};

export type Category = {
  id: string;
  name: string;
  type:string;
  widgets: Widget[];
};