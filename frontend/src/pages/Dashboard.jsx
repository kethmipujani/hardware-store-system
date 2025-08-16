import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiPlus, 
  FiShoppingCart, 
  FiBox, 
  FiDollarSign, 
  FiPieChart, 
  FiTruck,
  FiLogOut 
} from "react-icons/fi";
import logo from "../assets/logo.png";

// Main component function
function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Sample data - replace with your actual data
  const stats = [
    { title: "Today's Sales", value: "$2,450", change: "+12%", icon: <FiDollarSign className="text-green-500" /> },
    { title: "Inventory Items", value: "1,284", change: "-3%", icon: <FiBox className="text-blue-500" /> },
    { title: "Pending Sales", value: "18", change: "+5", icon: <FiShoppingCart className="text-orange-500" /> },
    { title: "Suppliers", value: "23", change: "", icon: <FiTruck className="text-purple-500" /> }
  ];

  const recentSales = [
    { id: "#SALE-1001", customer: "John Smith", date: "Today, 10:30 AM", amount: "$245", status: "Completed" },
    { id: "#SALE-1002", customer: "Maria Garcia", date: "Today, 09:15 AM", amount: "$189", status: "Processing" },
    { id: "#SALE-1003", customer: "Construction Co.", date: "Yesterday", amount: "$1,245", status: "Completed" }
  ];

  const lowStockItems = [
    { name: "Steel Nails (1kg)", stock: 3, threshold: 10, supplier: "BuildMart Inc." },
    { name: "Paint Brushes", stock: 5, threshold: 15, supplier: "Hardware World" },
    { name: "Safety Gloves", stock: 2, threshold: 20, supplier: "Tool Masters" }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#00005A] text-white p-4 flex flex-col h-full relative">
        <div className="p-4 mb-8">
          <h1 className="text-2xl font-bold italic">Wickramaarachchi Enterprises</h1>
          <p className="text-sm text-gray-300 italic">Inventory System</p>
        </div>
        <nav className="flex-1">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === "dashboard" ? "bg-[#8B000B] text-white" : "hover:bg-[#00007A]"}`}
          >
            <FiPieChart className="mr-3" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab("products")}
            className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === "products" ? "bg-[#8B000B] text-white" : "hover:bg-[#00007A]"}`}
          >
            <FiBox className="mr-3" />
            Products
          </button>
          
          <button 
            onClick={() => setActiveTab("sales")}
            className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === "sales" ? "bg-[#8B000B] text-white" : "hover:bg-[#00007A]"}`}
          >
            <FiShoppingCart className="mr-3" />
            Sales
          </button>
          
          <button 
            onClick={() => setActiveTab("suppliers")}
            className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === "suppliers" ? "bg-[#8B000B] text-white" : "hover:bg-[#00007A]"}`}
          >
            <FiTruck className="mr-3" />
            Suppliers
          </button>
          
          <button 
            onClick={() => setActiveTab("reports")}
            className={`flex items-center w-full p-3 mb-2 rounded-lg ${activeTab === "reports" ? "bg-[#8B000B] text-white" : "hover:bg-[#00007A]"}`}
          >
            <FiDollarSign className="mr-3" />
            Reports
          </button>
        </nav>
        
        <div className="mt-auto pt-24 border-t border-[#00007A] w-full">
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center p-3 mt-8 text-red-300 hover:bg-red-900 rounded-lg transition-colors w-full"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/sales/new")}
              className="flex items-center bg-[#00005A] hover:bg-[#00007A] text-white px-4 py-2 rounded-lg shadow-md transition-colors"
            >
              <FiPlus className="mr-2" />
              New Sale
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="text-2xl">
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-sm mt-2 ${stat.change.includes("+") ? "text-green-500" : stat.change === "!" ? "text-red-500" : "text-gray-500"}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Sales */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Sales</h3>
              <button 
                onClick={() => navigate("/sales")}
                className="text-[#00005A] hover:text-[#8B000B] text-sm font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSales.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/sale/${sale.id}`)}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{sale.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{sale.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{sale.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          sale.status === "Completed" ? "bg-green-100 text-green-800" : 
                          sale.status === "Processing" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts with Supplier Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Low Stock Items</h3>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Supplier: {item.supplier}</p>
                    <p className="text-sm text-gray-600">Threshold: {item.threshold}</p>
                  </div>
                  <div className="text-red-600 font-bold">
                    {item.stock} left
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => navigate("/products?filter=low-stock")}
                  className="text-[#00005A] hover:text-[#8B000B] text-sm font-medium"
                >
                  View All Low Stock Items
                </button>
                <button 
                  onClick={() => navigate("/suppliers")}
                  className="text-[#00005A] hover:text-[#8B000B] text-sm font-medium"
                >
                  Contact Suppliers
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;