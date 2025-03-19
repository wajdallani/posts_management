import { useState } from "react";
import { loginUser } from "@/api/authApi";
import { useRouter } from "next/router";
import {jwtDecode} from "jwt-decode";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Function to extract role from the token
const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  console.log("token:",token)
  if (!token) return null;

  try {
    const decodedToken: any = jwtDecode(token); // Decode the JWT
    console.log("decodedtoken", decodedToken)
    return decodedToken.role; // Extract the role
  } catch (error) {
    return null;
  }
};

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });
      console.log(data)
      localStorage.setItem("token", data.access_token); // Store JWT
      const role = getRoleFromToken();
      console.log("role:", role)
      // Redirect based on role
      if (role === "ADMIN") {
        router.push("/admins");
      } else if (role === "POSTER") {
        alert("i'm a poster");
        router.push("/poster-dashboard");
      } else {
        router.push("/login"); // Or any other fallback path
      }
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="border p-2 block" type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value); setError("");}} />
      <input className="border p-2 block mt-2" type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); setError("");}} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleLogin}>Login</button>
    </div>
  );
}
