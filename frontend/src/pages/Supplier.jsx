import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiX, FiSave, FiUser, FiPhone, FiMail, FiBriefcase, FiMapPin } from "react-icons/fi";

function Supplier() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactInfo: "",
    companyName: "",
    email: "",
    address: ""
  });
  const [editSupplier, setEditSupplier] = useState({
    name: "",
    contactInfo: "",
    companyName: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/suppliers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuppliers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      setSuppliers([]);
    }
  };

  const addSupplier = async () => {
    try {
      const token = localStorage.getItem("token");
  await axios.post("http://localhost:8080/api/suppliers", newSupplier, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewSupplier({ name: "", contactInfo: "", companyName: "", email: "", address: "" });
      setIsAdding(false);
      fetchSuppliers();
    } catch (err) {
      console.error("Error adding supplier:", err);
    }
  };

  const updateSupplier = async (id) => {
    try {
      const token = localStorage.getItem("token");
  await axios.put(`http://localhost:8080/api/suppliers/${id}`, editSupplier, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingId(null);
      fetchSuppliers();
    } catch (err) {
      console.error("Error updating supplier:", err);
    }
  };

  const deleteSupplier = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    
    try {
      const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:8080/api/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchSuppliers();
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };

  const startEdit = (supplier) => {
    setEditingId(supplier.id);
    setEditSupplier({
      name: supplier.name,
      contactInfo: supplier.contactInfo,
      companyName: supplier.companyName,
      email: supplier.email,
      address: supplier.address || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

  const handleCloseModal = () => {
    setIsAdding(false);
    setNewSupplier({ name: "", contactInfo: "", companyName: "", email: "", address: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <div className="max-w-7xl mx-auto">
        <button
          className="flex items-center text-[#00005A] hover:text-[#8B000B] mb-4"
          onClick={() => navigate('/dashboard')}
        >
          <FiArrowLeft className="mr-2" size={20} />
          Back to Dashboard
        </button>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#00005A]">Suppliers Management</h2>
            <p className="text-gray-600">Manage your suppliers and vendor information</p>
          </div>
          <button
            onClick={handleAddButtonClick}
            className="flex items-center bg-[#00005A] hover:bg-[#00007A] text-white px-4 py-2 rounded-lg mt-4 sm:mt-0 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Supplier
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers by name, company, email, or phone..."
              className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Add Supplier Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Add New Supplier</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Company Name*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                      value={newSupplier.companyName}
                      onChange={(e) => setNewSupplier({ ...newSupplier, companyName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Contact Person*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter contact name"
                      className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                      value={newSupplier.contactInfo}
                      onChange={(e) => setNewSupplier({ ...newSupplier, contactInfo: e.target.value })}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter full address"
                      className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                      value={newSupplier.address}
                      onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addSupplier}
                  disabled={!newSupplier.name || !newSupplier.contactInfo || !newSupplier.companyName}
                  className="bg-[#00005A] text-white px-4 py-2 rounded-lg hover:bg-[#00007A] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    {editingId === supplier.id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="border border-gray-300 p-1 rounded w-full text-sm"
                            value={editSupplier.companyName}
                            onChange={(e) => setEditSupplier({ ...editSupplier, companyName: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="border border-gray-300 p-1 rounded w-full text-sm"
                            value={editSupplier.name}
                            onChange={(e) => setEditSupplier({ ...editSupplier, name: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="email"
                            className="border border-gray-300 p-1 rounded w-full text-sm"
                            value={editSupplier.email}
                            onChange={(e) => setEditSupplier({ ...editSupplier, email: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="border border-gray-300 p-1 rounded w-full text-sm"
                            value={editSupplier.contactInfo}
                            onChange={(e) => setEditSupplier({ ...editSupplier, contactInfo: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            className="border border-gray-300 p-1 rounded w-full text-sm"
                            value={editSupplier.address}
                            onChange={(e) => setEditSupplier({ ...editSupplier, address: e.target.value })}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateSupplier(supplier.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Save"
                            >
                              <FiSave size={18} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-gray-600 hover:text-gray-800 transition-colors"
                              title="Cancel"
                            >
                              <FiX size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{supplier.companyName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {supplier.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {supplier.email ? (
                            <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:text-blue-800">
                              {supplier.email}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={`tel:${supplier.contactInfo}`} className="text-blue-600 hover:text-blue-800">
                            {supplier.contactInfo}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {supplier.address || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => startEdit(supplier)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Edit"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                              onClick={() => deleteSupplier(supplier.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchTerm ? "No suppliers found matching your search." : "No suppliers found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Supplier;