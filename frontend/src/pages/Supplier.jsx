import { useEffect, useState } from "react";
import axios from "axios";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contactInfo: "",
    companyName: "",
    email: ""
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/suppliers");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  const addSupplier = async () => {
    try {
      await axios.post("http://localhost:8080/suppliers", newSupplier);
      setNewSupplier({ name: "", contactInfo: "", companyName: "", email: "" });
      fetchSuppliers();
    } catch (err) {
      console.error("Error adding supplier:", err);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/suppliers/${id}`);
      fetchSuppliers();
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Suppliers</h2>

      {/* Add Supplier Form */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={newSupplier.contactInfo}
          onChange={(e) => setNewSupplier({ ...newSupplier, contactInfo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={newSupplier.companyName}
          onChange={(e) => setNewSupplier({ ...newSupplier, companyName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newSupplier.email}
          onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
        />
        <button onClick={addSupplier}>Add Supplier</button>
      </div>

      {/* Supplier List */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Company</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.contactInfo}</td>
              <td>{s.companyName}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => deleteSupplier(s.id)}>Delete</button>
                {/* Later we can add Edit button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Supplier;
