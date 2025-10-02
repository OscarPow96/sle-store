"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/auth/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (err) {
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
    /*api.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token")
        router.push("/auth/login")
      })
      .finally(() => setLoading(false))*/
  }, [router]);

  if (loading) return <p className="p-6">Cargando perfil...</p>;
  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <h1
        className="text-4xl font-extrabold mb-8 
                   bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent 
                   transition-all duration-500
                   hover:from-yellow-300 hover:to-pink-300"
      >
        Bienvenido, {user.firstName}{" "}
      </h1>
      <div className="flex flex-col gap-2 p-4 bg-gray-900 rounded-lg shadow-md border border-white/20 text-white w-fit">
        <img
          src={user.image}
          alt={user.username}
          className="w-24 h-24 rounded-full border mb-4 mx-auto"
        />
        <p className="mt-2 text-gray-200 border-b border-white/20 pb-2">
          <strong>Usuario:</strong> {user.username}
        </p>
        <p className="mt-2 text-gray-200 border-b border-white/20 pb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <div className="mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/auth/login");
            }}
            className="px-2 py-2 rounded-md bg-red-500 text-white font-semibold shadow-md 
             hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all duration-150"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
