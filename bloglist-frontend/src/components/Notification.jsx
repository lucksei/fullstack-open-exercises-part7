import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return <></>;
  }

  return (
    <div className="flex justify-center fixed top-4 right-0 z-20">
      <div
        className={`${notification.type === 'success' ? 'bg-green-300 border-green-600 text-green-900' : 'bg-red-300 border-red-600 text-red-900'} flex flex-row border rounded-md m-2 py-4 ps-4 pe-12 shadow-lg w-max`}>
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;
