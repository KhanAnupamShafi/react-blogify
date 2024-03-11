const Alert = ({ onClose, onDelete }) => {
  const handleDeleteTask = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-xl font-bold text-gray-100">
            Are you sure delete?
          </h1>
        </div>

        <p className="mt-2 text-md text-zinc-400">
          If you continue, you will permanently delete this record. Are you sure
          you want to continue?
        </p>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            type="button"
            className="mr-2 px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-500 hover:bg-gray-600 rounded-md shadow-md">
            Back
          </button>
          <button
            onClick={handleDeleteTask}
            type="button"
            className="px-2 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-500 hover:bg-red-600 rounded-md shadow-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
