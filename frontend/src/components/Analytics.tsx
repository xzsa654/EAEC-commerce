"use client";

import type { ButtonProps, CardProps } from "@heroui/react";

import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import {
  Card,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
  addToast,
  CircularProgress,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import axiosInstance from "@/lib/axios";
import { motion } from "framer-motion";
type ChartData = {
  name: string;
  value: number;
  [key: string]: string | number;
};

type CircleChartProps = {
  title: string;
  color: ButtonProps["color"];
  chartData: ChartData[];
  total: number;
};

export default function Analytics() {
  const data: CircleChartProps[] = [
    {
      title: "會員數量",
      color: "default",
      total: 50,
      chartData: [
        {
          name: "當前會員數",
          value: 11,
          fill: "hsl(var(--heroui-primary))",
        },
      ],
    },
    {
      title: "商品總數",
      color: "primary",
      total: 50,
      chartData: [
        { name: "商品總數", value: 1840, fill: "hsl(var(--heroui-primary))" },
      ],
    },
    {
      title: "總訂單數",
      color: "secondary",
      total: 50,
      chartData: [
        {
          name: "總訂單數",
          value: 3150,
          fill: "hsl(var(--heroui-secondary))",
        },
      ],
    },
    {
      title: "總銷售額",
      color: "danger",
      total: 50,
      chartData: [
        {
          name: "總銷售額",
          value: 3150,
          fill: "hsl(var(--heroui-secondary))",
        },
      ],
    },
  ];
  const [analyticsData, setAnalyticsData] = React.useState(data);
  const [dailySalesData, setDailySalesData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axiosInstance.get("/analytics");
        setAnalyticsData((prev) => {
          const newData: CircleChartProps[] = prev?.map((item, i) => {
            const updatedItem = { ...item };
            switch (i) {
              case 0:
                updatedItem.total = res.data.analyticsData.totalUsers;
                updatedItem.chartData[0].value =
                  res.data.analyticsData.totalUsers;
                break;
              case 1:
                updatedItem.total = res.data.analyticsData.totalProducts;
                updatedItem.chartData[0].value =
                  res.data.analyticsData.totalProducts;
                break;
              case 2:
                updatedItem.total = res.data.analyticsData.totalSales;
                updatedItem.chartData[0].value =
                  res.data.analyticsData.totalSales;
                break;
              case 3:
                updatedItem.total = res.data.analyticsData.totalRevenue;
                updatedItem.chartData[0].value =
                  res.data.analyticsData.totalRevenue;
            }
            return updatedItem;
          });
          return newData;
        });
        setDailySalesData(res.data.dailySales);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.response.data.message);

        addToast({
          title: "取得分析資料失敗",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);
  if (isLoading) return <CircularProgress size="lg" color="primary" />;
  return (
    <div className="min-h-screen space-y-10">
      <dl className="grid w-full  grid-cols-1 gap-10  sm:grid-cols-2 ">
        {analyticsData?.map((item, index) => (
          <CircleChartCard key={index} {...item} />
        ))}
      </dl>
      <motion.div
        className="bg-default-50 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId={"left"} stroke="#D1D5DB" />
            <YAxis yAxisId={"right"} orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId={"left"}
              dataKey="sales"
              type={"monotone"}
              stroke="#4F46E5"
              name="訂單數"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId={"right"}
              type={"monotone"}
              dataKey={"revenue"}
              stroke="#22C55E"
              activeDot={{ r: 8 }}
              name="銷售額"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

const formatTotal = (value: number | undefined) => {
  return value?.toLocaleString() ?? "0";
};

const CircleChartCard = React.forwardRef<
  HTMLDivElement,
  Omit<CardProps, "children"> & CircleChartProps
>(({ className, title, color, chartData, total, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "h-[250px] w-[75vw] sm:w-[25vw]  border border-transparent dark:border-default-100",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-y-2 p-4 pb-0">
        <div className="flex items-center justify-between gap-x-2">
          <dt>
            <h3 className="text-small font-medium text-default-500">{title}</h3>
          </dt>
          <div className="flex items-center justify-end gap-x-2">
            <Dropdown
              classNames={{
                content: "min-w-[120px]",
              }}
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <Icon height={16} icon="solar:menu-dots-bold" width={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  title: "text-tiny",
                }}
                variant="flat"
              >
                <DropdownItem key="view-details">View Details</DropdownItem>
                <DropdownItem key="export-data">Export Data</DropdownItem>
                <DropdownItem key="set-alert">Set Alert</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex h-full gap-x-3">
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <RadialBarChart
            barSize={10}
            cx="50%"
            cy="50%"
            data={chartData}
            endAngle={-45}
            innerRadius={90}
            outerRadius={70}
            startAngle={225}
          >
            <PolarAngleAxis
              angleAxisId={0}
              domain={[0, total]}
              tick={false}
              type="number"
            />
            <RadialBar
              angleAxisId={0}
              animationDuration={1000}
              animationEasing="ease"
              background={{
                fill: "hsl(var(--heroui-default-100))",
              }}
              cornerRadius={12}
              dataKey="value"
            >
              {chartData?.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--heroui-${color === "default" ? "foreground" : color}))`}
                />
              ))}
            </RadialBar>
            <g>
              <text textAnchor="middle" x="50%" y="48%">
                <tspan
                  className="fill-default-500 text-tiny"
                  dy="-0.5em"
                  x="50%"
                >
                  {chartData?.[0].name}
                </tspan>
                <tspan
                  className="fill-foreground text-medium font-semibold"
                  dy="1.5em"
                  x="50%"
                >
                  {formatTotal(total)}
                </tspan>
              </text>
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});

CircleChartCard.displayName = "CircleChartCard";
