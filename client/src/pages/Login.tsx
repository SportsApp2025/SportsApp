import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { setUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const {user} = response.data; // Assuming API returns { id, email, name }
      console.log(user);
      

      dispatch(setUser(user)); // Update Redux store
      toast.success("Login successful! Redirecting to home...");

      setTimeout(() => navigate("/home"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div
      className="flex h-[100vh] w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://github.com/SportsApp2025/Sports_App_Frontend/blob/main/Frontend/src/assets/images/football.jpg?raw=true')",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-0 pointer-events-none"></div>

      {/* Left side with welcome text */}
      <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-center items-center text-white px-8 gap-[450px]">
        <div className="bg-black/40 p-4 rounded-lg mt-6 text-center">
          <h1 className="text-5xl font-bold drop-shadow-lg">Welcome Back to Sports App</h1>
          <p className="text-lg">
            Connect with experts in the sports industry and assess your skills and performances.
          </p>
        </div>
        <div className="mt-4 flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full opacity-70" />
          <div className="w-3 h-3 bg-white rounded-full opacity-50" />
          <div className="w-3 h-3 bg-white rounded-full opacity-50" />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-6 relative z-10">
        <Card
          className="w-full max-w-md p-6 shadow-lg 
          bg-white text-gray-900 dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-gray-700 
          dark:text-white "
        >
          <CardContent>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Login to Sports App</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Access your account and continue your journey.</p>

            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <Label>Email Address</Label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              <div className="mt-4">
                <Label>Password</Label>
                <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="********" required />
              </div>

              <Button className="w-full mt-6" type="submit" disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </Button>
            </form>

            <p className="text-center text-sm mt-4">
              New here?{" "}
              <Link to="/signup" className="text-blue-800">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
