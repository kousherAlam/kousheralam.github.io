import Skils from "./Skills";

import { BsYoutube, BsLinkedin, BsGithub } from "react-icons/bs";
const Hero = () => (
  <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 md:grid-cols-6">
    <div className="md:col-span-4 order-2 sm:order-1">
      <p>Hello there 👋</p>
      <h1 className="text-4xl">
        <span>I'm</span>
        <span className="ml-3 font-bold text-orange-500">Kousher Alam</span>
      </h1>
      <p className="mt-0 text-sm">
        <span>Senior Solutions developer</span>
        <span className="ml-1 font-bold">@</span>
        <a
          className="text-orange-500 hover:text-orange-400 visited:text-orange-600 ml-1"
          href="https://ottoint.com/"
          target="_blank"
        >
          Otto International
        </a>
      </p>
      <div>
        <ul className="text-2xl list-none flex space-x-3 mt-2">
          <li>
            <a
              className="text-blue-500 hover:text-blue-400 visited:bg-blue-600"
              href="https://www.linkedin.com/in/kousheralam/"
              target="_blank"
            >
              <BsLinkedin />
            </a>
          </li>
          <li>
            <a
              className="text-gray-500 hover:text-gray-400 visited:bg-gray-600"
              href="https://github.com/kousherAlam"
              target="_blank"
            >
              <BsGithub />
            </a>
          </li>
          <li>
            <a
              className="text-red-500 hover:text-red-400 visited:bg-red-600"
              href="https://www.youtube.com/@kousheralam"
              target="_blank"
            >
              <BsYoutube />
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-6">
        My description: Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Eaque illum magnam alias dicta recusandae non fuga iusto saepe
        ullam magni?
      </p>
      <Skils />
    </div>
    <div className="order-1 sm:order-2 md:col-span-2 flex justify-center sm:justify-end">
      <img
        className="h-80 w-64 sm:pr-4"
        src="/assets/images/avatar.svg"
        alt="Kousher's Profile Picture"
      />
    </div>
  </div>
);

export { Hero };
