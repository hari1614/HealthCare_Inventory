import Tooltip from "./reusable/Tooltip";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 dark:border-gray-700">
        <hr className="w-full border-gray-200 dark:border-gray-200 mb-4" />
        <Tooltip text="RKS Health Care" position="bottom">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-2">
            © 2024{" "}
            <a href="#" className="hover:underline">
              RKS Health Care™
            </a>
            . All Rights Reserved.
          </span>
        </Tooltip>
        <hr className="w-full border-gray-200 dark:border-gray-200 mt-4 mb-8" />
      </div>
    </div>
  );
};

export default Footer;
