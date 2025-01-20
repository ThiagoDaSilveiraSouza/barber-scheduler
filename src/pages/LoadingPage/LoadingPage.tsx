import { AuthModal } from "../../components";

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <AuthModal />
      {/* <span className="loading loading-spinner loading-lg text-blue-500"></span> */}
    </div>
  );
};
