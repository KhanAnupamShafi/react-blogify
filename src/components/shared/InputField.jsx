const InputField = ({
  register,
  label,
  name,
  rules,
  errors,
  ...Props
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="block mb-2">
          {' '}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register(name, rules)}
          id={name}
          name={name}
          className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          {...Props}
        />
        {errors && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              aria-hidden={true}
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 20 20">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0a8 8 0 0 1 16 0m-7 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1"
                clipRule="evenodd"></path>
            </svg>
          </div>
        )}
      </div>
      {errors && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {errors.message || 'Error'}
        </p>
      )}
    </div>
  );
};

export default InputField;
