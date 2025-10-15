import { FileCode, Sun } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div
        className="nav flex items-center justify-between h-[70px] bg-black"
        style={{ padding: "0px 80px" }}
      >
        <div className="logo flex items-center gap-[10px]">
          <FileCode size={30} color="#9333ea" />
          <span
            className="text-2xl font-bold text-white ml-2"
            style={{
              fontFamily: "'Rock Salt', cursive",
              fontWeight: 400, 
              fontStyle: "normal",
            }}
          >
            Code Review Assistant
          </span>
        </div>
        <div className="icons flex items-center gap-[20px]">
          <i className="cursor-pointer transition-all hover:text-[#9333ea]">
            <Sun />
          </i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
