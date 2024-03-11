import Loader from './Loader';

const SkeletonLoader = () => {
  return (
    <div>
      <div className="flex flex-col w-full gap-5 p-2 mx-auto bg-gray-950 shadow-lg select-none sm:p-[.75rem] sm:h-52 rounded-2xl sm:flex-row border border-slate-800/40">
        <div className="bg-gray-600 max-h-48 sm:h-full sm:w-[340px] rounded-xl animate-pulse"></div>
        <div className="flex flex-col flex-1 gap-5">
          <div className="flex flex-col flex-1 gap-3">
            <div className="w-full bg-gray-600 animate-pulse h-14 rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-600 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-600 animate-pulse rounded-2xl"></div>
            <div className="w-full h-3 bg-gray-600 animate-pulse rounded-2xl"></div>
          </div>
          <div className="flex gap-3 mt-auto">
            <div className="w-20 h-6 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-20 h-6 ml-auto bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      <Loader message={'Loading Please wait ...'} />
    </div>
  );
};

export default SkeletonLoader;
