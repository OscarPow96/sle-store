'use client'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function NavBar() {
    const items = useCartStore(s => s.items)
    const totalCount = items.reduce((c, i) => c + i.quantity, 0)

    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const checkAuth = () => {
      const token = localStorage.getItem("token")
      setIsAuth(!!token)
      }

      checkAuth()

      window.addEventListener('storage', checkAuth)

      const interval = setInterval(checkAuth, 1000)
      
      return () => {
        window.removeEventListener('storage', checkAuth)
        clearInterval(interval)
      }
    }, [])

    const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsAuth(false)
      router.push("/auth/login")
    }

    return (
<nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold relative group">
          <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-pink-300 transition-all duration-500">
            SLE ♣ Store
          </span>
        </Link>

        <div className="flex gap-6 text-white font-medium">
          <Link href="/" className="hover:text-yellow-300 transition">
            Catálogo
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-yellow-300 transition">
          <ShoppingCartIcon className="h-6 w-6 text-white" />
          <span>({totalCount})</span>
          </Link>
          {!isAuth ? (
            <Link href="/auth/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
          ) : (
            <>
            <Link href="/profile" className="hover:text-yellow-300 transition">Perfil</Link>
            <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold shadow-md 
             hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all duration-150">Cerrar Sesión</button>
            </>
          )}
        </div>
      </div>
    </nav>
    )
}