"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { fakeUsers } from "@/lib/auth-data"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState ("")
    const [loading, setLoading] = useState (false)
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

         try {
            // ✅ Buscar en usuarios locales
            const user = fakeUsers.find(
                u => u.username === username && u.password === password
            );

            if (user) {
                
                const token = "sle-token-" + Date.now();
                
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                
                console.log("Login exitoso con usuario local");
                router.push("/profile");
            } else {
                alert("Usuario o contraseña incorrectos");
            }
            
        } catch (err) {
            console.error("Error:", err);
            alert("Error en el login");
        } finally {
            setLoading(false);
        }
        /*try {
            console.log("Enviando:", { username, password });
            const res = await api.post("/auth/login", { username, password });
            console.log("Respuesta:", res.data)
            localStorage.setItem("token", res.data.token);
            router.push("/profile");
        } catch (err: any) {
            console.log("Error completo:", err.response?.data);
            alert("Credenciales Invalidas");
        } finally {
            setLoading(false);
        }*/
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form onSubmit={handleLogin} className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
             bg-[length:200%_200%] animate-gradient
             p-6 rounded-2xl shadow-2xl border border-white border-opacity-30 
             w-80 text-white">
        <h2 className="text-2xl mb-4 font-bold 
                 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent 
                 group-hover:from-yellow-300 group-hover:to-pink-300 transition-all duration-500">Login</h2>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full mb-2 p-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md 
             hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-150">
          Ingresar
        </button>
      </form>
        </div>
    )
}