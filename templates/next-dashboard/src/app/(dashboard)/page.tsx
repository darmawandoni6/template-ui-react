'use client';

import * as React from 'react';

import { Activity, ArrowDownRight, ArrowUpRight, CreditCard, DollarSign, Download, Users } from 'lucide-react';

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { dashboardService } from '@/services';
import { useDashboardStore } from '@/stores';
import type { DashboardOverviewData } from '@/validators/dashboard.schema';

const metricIcons = [DollarSign, Users, CreditCard, Activity];

export default function DashboardOverviewPage() {
  const { activeTeam, dateRange, setDateRange } = useDashboardStore();
  const [data, setData] = React.useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const overview = await dashboardService.getOverview();
        setData(overview);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard Overview</h2>
          <p className="text-muted-foreground text-sm">
            Current organization workspace: <span className="text-foreground font-semibold">{activeTeam}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted/40 flex rounded-lg border p-1">
            {(['7d', '30d', '90d', '12m'] as const).map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.metrics.map((metric, idx) => {
          const Icon = metricIcons[idx % metricIcons.length];
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className="bg-muted flex size-8 items-center justify-center rounded-lg">
                  <Icon className="text-muted-foreground size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-muted-foreground mt-1 flex items-center text-xs">
                  {metric.isPositive ? (
                    <ArrowUpRight className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3.5 w-3.5 text-rose-500" />
                  )}
                  <span className={metric.isPositive ? 'font-medium text-emerald-500' : 'font-medium text-rose-500'}>
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Chart Mock & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Performance Overview (4 cols) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Monthly traffic & revenue progression across {activeTeam}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="flex h-72 w-full items-end gap-2 pt-6 pb-2">
              {[45, 62, 58, 80, 75, 90, 85, 95, 110, 100, 125, 140].map((val, i) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const heightPercent = Math.round((val / 150) * 100);

                return (
                  <div key={months[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="bg-primary/80 hover:bg-primary w-full rounded-md transition-all"
                    />
                    <span className="text-muted-foreground text-[10px]">{months[i]}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions / Activity (3 cols) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions recorded this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {data?.recentActivities.slice(0, 5).map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={item.user.slice(0, 2)} className="h-9 w-9" />
                    <div className="grid gap-0.5 leading-none">
                      <p className="text-sm font-medium">{item.user}</p>
                      <p className="text-muted-foreground max-w-[130px] truncate text-xs">{item.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.amount}</p>
                    <Badge
                      variant={
                        item.status === 'Completed'
                          ? 'default'
                          : item.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                      }
                      className="px-1.5 py-0 text-[10px]"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Comprehensive audit log of recent transactions and events</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-muted-foreground animate-pulse py-8 text-center text-sm">Loading transactions...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.recentActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-mono text-xs font-medium">{activity.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{activity.user}</div>
                      <div className="text-muted-foreground text-xs">{activity.email}</div>
                    </TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          activity.status === 'Completed'
                            ? 'default'
                            : activity.status === 'Pending'
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{activity.date}</TableCell>
                    <TableCell className="text-right font-medium">{activity.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
