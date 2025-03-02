const Button = ({ label, onClick, variant = "primary" }) => {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation(); // Prevents parent elements from blocking the event
        console.log(`${label} button clicked`);
        if (typeof onClick === "function") {
          onClick(); // Ensures the function executes
        } else {
          console.warn(`No function provided for ${label} button`);
        }
      }}
      className={`px-4 py-1 rounded-md text-white ${
        variant === "primary" ? "bg-indigo-600" : "bg-red-600"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;