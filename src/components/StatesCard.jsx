
function StatesCard({ icon, title, value }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          {icon}
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    );
  }
  export default StatesCard