import { Link } from "react-router-dom";
import { Input } from "./components/Input";
import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isPassword, setIsPassword] = useState(false);
  const handlePassword = () => setIsPassword(!isPassword);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleForm = (e) => {
    e.preventDefault();
    console.log("formData", formData);
  };
  return (
    <div className="h-full min-h-svh lg:min-h-screen w-full grid place-items-center">
      <section className="container mx-auto py-8 md:py-20">
        <div className="w-full max-w-[600px] border p-4 lg:p-5 rounded-lg mx-auto">
          <h4 className="text-black font-bold text-lg lg:text-xl text-center mb-4">
            Login your account
          </h4>
          <form className="grid grid-cols-1 gap-4" onSubmit={handleForm}>
            <Input
              type="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
            <div className="relative">
              <Input
                label="Password"
                type={isPassword ? "text" : "password"}
                placeholder="*******"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
              <div
                className="absolute top-[55%] right-4 cursor-pointer z-0"
                onClick={handlePassword}
              >
                {isPassword ? <VscEye /> : <VscEyeClosed />}
              </div>
            </div>
            <button
              className="bg-primary hover:bg-white hover:border border-primary text-white hover:text-black font-semibold text-base w-full py-3 px-4 rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-5">
            Done have an account?{" "}
            <Link
              className="bg-primary text-white font-semibold py-1 px-4 rounded-md"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
