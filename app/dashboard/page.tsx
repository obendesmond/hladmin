"use client";

import { TrendingUp } from "lucide-react";
import {
  Pie,
  PieChart,
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Sector,
} from "recharts";
import React, { useState, useEffect } from "react";
import { useAnalyticsStore } from "@/stores/admin/analytics-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DateRangePicker } from "./rls/components/date-range-picker";
import { getDynamicTimeRange } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Chart configuration
const chartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  Unknown: { label: "Unknown", color: "var(--chart-2)" },
};

export default function Dashboard() {
  const { getAnalytics, loading, dashboardAnalytics } = useAnalyticsStore();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const initialTimeRange = getDynamicTimeRange();
  const [timeRange, setTimeRange] = useState({
    time_start_seconds: initialTimeRange.time_start_seconds,
    time_end_seconds: initialTimeRange.time_end_seconds,
  });

  useEffect(() => {
    getAnalytics({ time_range: timeRange });
  }, [getAnalytics]);

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill}>
          {payload.browser}
        </text>
        <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
          {`${payload.visitors} visitors`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  // Transform data for charts
  const browserData = dashboardAnalytics.reduce((acc: any[], data) => {
    Object.entries(data.browser_name).forEach(([browser, count]) => {
      const existing = acc.find((item) => item.browser === browser);
      if (existing) {
        existing.visitors += count;
      } else {
        acc.push({
          browser,
          visitors: count,
          fill: browser === "chrome" ? "var(--chart-1)" : "var(--chart-2)",
        });
      }
    });
    return acc;
  }, []);

  const osData = dashboardAnalytics.reduce((acc: any[], data) => {
    Object.entries(data.os_name).forEach(([os, count]) => {
      const existing = acc.find((item) => item.os === os);
      if (existing) {
        existing.visitors += count;
      } else {
        acc.push({
          os,
          visitors: count,
          fill: os === "windows" ? "var(--chart-1)" : "var(--chart-2)",
        });
      }
    });
    return acc;
  }, []);

  const deviceCategoryData = dashboardAnalytics.reduce((acc: any[], data) => {
    Object.entries(data.device_category).forEach(([category, count]) => {
      const existing = acc.find((item) => item.category === category);
      if (existing) {
        existing.count += count;
      } else {
        acc.push({ category, count });
      }
    });
    return acc;
  }, []);

  const deviceVendorData = dashboardAnalytics.reduce((acc: any[], data) => {
    Object.entries(data.device_vendor).forEach(([vendor, count]) => {
      const existing = acc.find((item) => item.vendor === vendor);
      if (existing) {
        existing.count += count;
      } else {
        acc.push({ vendor, count });
      }
    });
    return acc;
  }, []);

  const handleDateRangeChange = (newTimeRange: {
    time_start_seconds: number;
    time_end_seconds: number;
  }) => {
    setTimeRange(newTimeRange);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-4 items-center">
          <DateRangePicker
            timeStartSeconds={timeRange.time_start_seconds}
            timeEndSeconds={timeRange.time_end_seconds}
            onChange={handleDateRangeChange}
          />
          <Button
            size="sm"
            onClick={() => getAnalytics({ time_range: timeRange })}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="aspect-video" />
        ))}
      </div>
      ) : (
      <div className="grid grid-cols-2 gap-6">
        {/* Browser Distribution Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Browser Distribution</CardTitle>
            <CardDescription>{`Showing data from ${new Date(
              timeRange.time_start_seconds * 1000
            ).toLocaleDateString()} to ${new Date(
              timeRange.time_end_seconds * 1000
            ).toLocaleDateString()}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              className="mx-auto aspect-square max-h-[250px]"
              config={chartConfig}
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={browserData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  outerRadius={80}
                  activeIndex={activeIndex as number}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={() => setActiveIndex(null)}
                  strokeWidth={3}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 1.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing browser usage distribution for the selected time range
            </div>
          </CardFooter>
        </Card>

        {/* OS Distribution Chart */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>OS Distribution</CardTitle>
            <CardDescription>{`Showing data from ${new Date(
              timeRange.time_start_seconds * 1000
            ).toLocaleDateString()} to ${new Date(
              timeRange.time_end_seconds * 1000
            ).toLocaleDateString()}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              className="mx-auto aspect-square max-h-[250px]"
              config={chartConfig}
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={osData}
                  dataKey="visitors"
                  nameKey="os"
                  innerRadius={60}
                  outerRadius={80}
                  activeIndex={activeIndex as number}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={() => setActiveIndex(null)}
                  strokeWidth={3}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing OS usage distribution for the selected time range
            </div>
          </CardFooter>
        </Card>

        {/* Device Category Distribution (Bar chart) */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Device Category Distribution</CardTitle>
            <CardDescription>{`Showing data from ${new Date(
              timeRange.time_start_seconds * 1000
            ).toLocaleDateString()} to ${new Date(
              timeRange.time_end_seconds * 1000
            ).toLocaleDateString()}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deviceCategoryData}>
                <XAxis dataKey="category" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="count"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing device category distribution for the selected time range
            </div>
          </CardFooter>
        </Card>

        {/* Device Vendor Distribution (Bar chart) */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Device Vendor Distribution</CardTitle>
            <CardDescription>{`Showing data from ${new Date(
              timeRange.time_start_seconds * 1000
            ).toLocaleDateString()} to ${new Date(
              timeRange.time_end_seconds * 1000
            ).toLocaleDateString()}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deviceVendorData}>
                <XAxis dataKey="vendor" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="count"
                  fill="var(--chart-2)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing device vendor distribution for the selected time range
            </div>
          </CardFooter>
        </Card>
      </div>
      )}

    </div>
  );
}
