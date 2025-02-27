import { Link } from "react-router-dom";
import { Input } from "./components/Input";
import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const SignupPage = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const handlePassword = () => setIsPassword(!isPassword);
  const handleConfirmPassword = () => setIsConfirmPassword(!isConfirmPassword);
  return (
    <div className="h-full min-h-svh lg:min-h-screen w-full grid place-items-center">
      <section className="container mx-auto py-8 md:py-20">
        <div className="w-full max-w-[600px] border p-4 lg:p-5 rounded-lg mx-auto">
          <h4 className="text-black font-bold text-lg lg:text-xl text-center mb-4">
            Create your account
          </h4>
          <form className="grid grid-cols-1 gap-4">
            <Input label="Full Name" placeholder="John Doe" />
            <Input type="email" label="Email" placeholder="johndoe@gmail.com" />
            <div className="relative">
              <Input
                label="Password"
                type={isPassword ? "text" : "password"}
                placeholder="*******"
              />
              <div
                className="absolute top-[55%] right-4 cursor-pointer z-0"
                onClick={handlePassword}
              >
                {isPassword ? <VscEye /> : <VscEyeClosed />}
              </div>
            </div>
            <div className="relative">
              <Input
                label="Password"
                type={isConfirmPassword ? "text" : "password"}
                placeholder="*******"
              />
              <div
                className="absolute top-[55%] right-4 cursor-pointer z-0"
                onClick={handleConfirmPassword}
              >
                {isConfirmPassword ? <VscEye /> : <VscEyeClosed />}
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center gap-2 mt-5">
            Already have an account?{" "}
            <Link
              className="bg-primary text-white font-semibold py-1 px-4 rounded-md"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
