'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
    // Simulate API data fetching
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Mock data for demonstration
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
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setDashboardData(mockData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [selectedPeriod])

  const StatCard = ({ title, value, icon: Icon, trend, color = "primary" }: any) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
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
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">Dashboard Analytics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Pengguna"
            value={dashboardData?.stats.totalUsers.toLocaleString()}
            icon={Users}
            trend={8.2}
            color="blue"
          />
          <StatCard
            title="Total Pendapatan"
            value={`$${dashboardData?.stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={12.5}
            color="green"
          />
          <StatCard
            title="Total Pesanan"
            value={dashboardData?.stats.totalOrders.toLocaleString()}
            icon={ShoppingCart}
            trend={-2.4}
            color="purple"
          />
          <StatCard
            title="Tingkat Pertumbuhan"
            value={`${dashboardData?.stats.growthRate}%`}
            icon={TrendingUp}
            trend={5.1}
            color="orange"
          />
        </div>

        {/* Charts and Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Tren Penjualan & Pesanan
              </CardTitle>
              <CardDescription>
                Perkembangan penjualan dan pesanan dalam 7 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChartComponent data={dashboardData?.chartData.line} />
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Penjualan per Produk
              </CardTitle>
              <CardDescription>
                Perbandingan penjualan dan pendapatan per produk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartComponent data={dashboardData?.chartData.bar} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Distribusi Perangkat
              </CardTitle>
              <CardDescription>
                Persentase pengguna berdasarkan jenis perangkat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChartComponent data={dashboardData?.chartData.pie} />
            </CardContent>
          </Card>

          {/* Interactive Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Peta Distribusi Pengguna
              </CardTitle>
              <CardDescription>
                Lokasi pengguna dan tingkat aktivitas per wilayah
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MapComponent markers={dashboardData?.mapData} />
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Status Sistem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Semua sistem berjalan normal</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Update Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleString('id-ID')}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Versi Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">v2.0.1</Badge>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}