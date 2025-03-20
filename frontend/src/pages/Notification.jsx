import { Link } from "react-router-dom";

const NotificationPage = () => {
  const notifications = [
    { message: "Your assignment is due tomorrow.", time: "10 mins ago" },
    { message: "New announcement in your course.", time: "1 hour ago" },
    { message: "Exam schedule has been updated.", time: "Yesterday" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        <Link to="/profile" className="text-blue-500">
          Back to Profile
        </Link>
      </div>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications</p>
      ) : (
        <ul className="border rounded-lg divide-y">
          {notifications.map((notification, index) => (
            <li key={index} className="p-4 hover:bg-gray-100">
              <p className="font-medium">{notification.message}</p>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
