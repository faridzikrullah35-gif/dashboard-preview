'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Activity, BarChart3, MapPin, PieChart, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react'
import LineChartComponent from '@/components/charts/LineChart'
import BarChartComponent from '@/components/charts/BarChart'
import PieChartComponent from '@/components/charts/PieChart'
import MapComponent from '@/components/maps/MapComponent'

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      const mockData = {
        stats: {
          totalUsers: 12543,
          totalRevenue: 45231,
          totalOrders: 3421,
          growthRate: 12.5
        },
        chartData: {
          line: [
            { name: 'Jan', value: 4000, orders: 240 },
            { name: 'Feb', value: 3000, orders: 139 },
            { name: 'Mar', value: 2000, orders: 980 },
            { name: 'Apr', value: 2780, orders: 390 },
            { name: 'May', value: 1890, orders: 480 },
            { name: 'Jun', value: 2390, orders: 380 },
            { name: 'Jul', value: 3490, orders: 430 }
          ],
          bar: [
            { name: 'Product A', sales: 4000, revenue: 2400 },
            { name: 'Product B', sales: 3000, revenue: 1398 },
            { name: 'Product C', sales: 2000, revenue: 9800 },
            { name: 'Product D', sales: 2780, revenue: 3908 },
            { name: 'Product E', sales: 1890, revenue: 4800 }
          ],
          pie: [
            { name: 'Desktop', value: 45, color: '#0088FE' },
            { name: 'Mobile', value: 30, color: '#00C49F' },
            { name: 'Tablet', value: 15, color: '#FFBB28' },
            { name: 'Other', value: 10, color: '#FF8042' }
          ]
        },
        mapData: [
          { id: 1, lat: -6.2088, lng: 106.8456, name: 'Jakarta', value: 1250, type: 'high' },
          { id: 2, lat: -7.2575, lng: 112.7521, name: 'Surabaya', value: 890, type: 'medium' },
          { id: 3, lat: -6.9175, lng: 107.6191, name: 'Bandung', value: 650, type: 'medium' },
          { id: 4, lat: -7.7956, lng: 110.3695, name: 'Yogyakarta', value: 420, type: 'low' },
          { id: 5, lat: -8.6705, lng: 115.2126, name: 'Denpasar', value: 380, type: 'low' }
        ]
      }

      await new Promise(resolve => setTimeout(resolve, 800))
      setDashboardData(mockData)
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [selectedPeriod])

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
            {trend}% dari bulan lalu
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-x-hidden">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* HEADER */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div className="flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold">
                Dashboard Analytics
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="24h">24 Jam</TabsTrigger>
                  <TabsTrigger value="7d">7 Hari</TabsTrigger>
                  <TabsTrigger value="30d">30 Hari</TabsTrigger>
                  <TabsTrigger value="90d">90 Hari</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Real-time
              </Button>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Pengguna" value={dashboardData.stats.totalUsers.toLocaleString()} icon={Users} trend={8.2} />
          <StatCard title="Total Pendapatan" value={`$${dashboardData.stats.totalRevenue.toLocaleString()}`} icon={DollarSign} trend={12.5} />
          <StatCard title="Total Pesanan" value={dashboardData.stats.totalOrders.toLocaleString()} icon={ShoppingCart} trend={-2.4} />
          <StatCard title="Tingkat Pertumbuhan" value={`${dashboardData.stats.growthRate}%`} icon={TrendingUp} trend={5.1} />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Tren Penjualan</CardTitle>
              <CardDescription>7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <LineChartComponent data={dashboardData.chartData.line} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Penjualan Produk</CardTitle>
              <CardDescription>Perbandingan produk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <BarChartComponent data={dashboardData.chartData.bar} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PIE + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Perangkat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px]">
                <PieChartComponent data={dashboardData.chartData.pie} />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Peta Distribusi</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[300px] sm:h-[400px]">
                <MapComponent markers={dashboardData.mapData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FOOT INFO */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-4 text-sm text-muted-foreground">
              Sistem berjalan normal
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-sm text-muted-foreground">
              {new Date().toLocaleString('id-ID')}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <Badge variant="secondary">v2.0.1</Badge>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  )
}