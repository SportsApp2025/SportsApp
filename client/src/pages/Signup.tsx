import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ModeToggle";

const Signup = () => {
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
          <h1 className="text-5xl font-bold drop-shadow-lg">Welcome to Sports App</h1>
            <p className="text-lg">Connect with experts in the sports industry and assess your skills and performances.</p>
          </div>
          <div className="mt-4 flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full opacity-70" />
            <div className="w-3 h-3 bg-white rounded-full opacity-50" />
            <div className="w-3 h-3 bg-white rounded-full opacity-50" />
          </div>
        </div>

      {/* Right side with signup form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-6 relative z-10">
        <Card
          className="w-full max-w-md p-6 shadow-lg 
          bg-white text-gray-900 dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-gray-700 
          dark:text-white "
        >
          <CardContent>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Sign Up to Sports App</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Join the community and start your journey.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>First Name</Label>
                <Input placeholder="John" />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="mt-4">
              <Label>Password</Label>
              <Input type="password" placeholder="********" />
            </div>
            <div className="mt-4">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="********" />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                By creating an account, you agree to our{" "}
                <Link to="#" className="text-blue-500">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-blue-500">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button className="w-full mt-6">Sign Up</Button>

            <p className="text-center text-sm mt-4">
              Already a member?{" "}
              <Link to="/login" className="text-blue-500">
                Log In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
