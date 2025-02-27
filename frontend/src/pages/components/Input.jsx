export const Input = ({ label, type = "text", ...rest }) => {
  return (
    <div>
      <label className="text-sm text-black">{label}</label>
      <input
        {...rest}
        type={type}
        className="w-full border h-[50px] text-sm text-black rounded-lg px-4 outline-none"
      />
    </div>
  );
};
