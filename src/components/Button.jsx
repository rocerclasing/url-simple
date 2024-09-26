import ButtonLoading from "./ButtonLoading";

// Define allowed colors in a mapping
const colorClasses = {
  purple: "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
  red: "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900",
  green: "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900",
  // Add more colors as needed
};

const Button = ({ text, type, color = "purple", loading, onClick }) => {
  if (loading) return <ButtonLoading />;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${colorClasses[color] || colorClasses.purple}`}
    >
      {text}
    </button>
  );
};

export default Button;
