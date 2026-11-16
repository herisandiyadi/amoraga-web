'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getToken } from '@/lib/api'
import AdminSidebar from '@/components/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuth, setIsAuth] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login')
    } else {
      setIsAuth(!!token || pathname === '/admin/login')
    }
    setChecking(false)
  }, [pathname, router])

  if (checking) {
    return <div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!isAuth) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
