import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { RiAdminFill, RiLogoutBoxLine } from "react-icons/ri";
import { useCookies } from "react-cookie";
export const NavbarAdmin: FC = () => {
  const [cookies, , removeCookie] = useCookies([
    "token",
    "user_position",
    "username",
  ]);
  const navigate = useNavigate();

  function handleLogout() {
    removeCookie("token");
    removeCookie("user_position");
    removeCookie("username");
    navigate("/");
  }

  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-@Red text-xl py-2 ">
      <div
        className="navbar max-w-[85rem] flex w-full mx-auto px-4"
        aria-label="Global"
      >
        <div className="flex-1">
          <Link to="/admin">
            <img src="/images/Logo.png" alt="" className=" w-40" />
          </Link>
        </div>
        <div className="flex-none text-white hover:bg-@Red">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="capitalize font-semibold text-white text-lg btn btn-ghost">
                <RiAdminFill /> {cookies.username}
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-white text-@Red ">
                <li>
                  <a
                    href="/approving"
                    className="flex items-center gap-2 hover:bg-@Red3 hover:text-black "
                  >
                    <BsFillFileEarmarkTextFill /> Approving
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:bg-@Red3 hover:text-black"
                  >
                    {" "}
                    <RiLogoutBoxLine />
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export const NavbarUser: FC = () => {
  const [cookies, ,] = useCookies(["token", "user_position", "username"]);

  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-@Red text-xl md:px-10 h-[10%]">
      <div
        className="navbar max-w-[85rem] flex w-full mx-auto px-4"
        aria-label="Global"
      >
        <div className="flex-1">
          <Link to="/user">
            <img src="/images/Logo.png" alt="" className=" w-40" />
          </Link>
        </div>{" "}
        <div
          data-theme="light"
          className="flex-none text-white hover:bg-@Red text-base  bg-@Red"
        >
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="capitalize font-semibold  btn btn-ghost">
                {cookies.username}
              </a>{" "}
              <ul className="p-2 bg-white text-@Red  ">
                <li className="">
                  <a
                    href="/profile-users"
                    className=" hover:bg-@Red3 hover:text-black "
                  >
                    Profile
                  </a>
                </li>{" "}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
