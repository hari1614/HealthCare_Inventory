const FormField = ({ label, type, onChange, placeholder, options, value }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "number" ? (
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange} // Pass onChange handler to input
          placeholder={placeholder}
          value={value}
          required
        />
      ) : type === "date" ? (
        <input
          type="date"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange} // Pass onChange handler to input
          placeholder={placeholder}
          value={value}
          required
        />
      ) : (
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onChange} // Pass onChange handler to input
          placeholder={placeholder}
          value={value}
          required
        />
      )}
    </div>
  );
};

export default FormField;


