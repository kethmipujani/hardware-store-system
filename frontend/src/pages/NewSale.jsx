import { useState } from "react";
import { FiSearch, FiTrash2, FiPlus, FiMinus, FiChevronDown } from "react-icons/fi";

function NewSale() {
  // Customer Information
  const [customer, setCustomer] = useState({ 
    name: "", 
    contact: "",
    address: "" 
  });

  // Product Search
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Cart State
  const [cart, setCart] = useState([]);

  // Payment Information
  const [paymentType, setPaymentType] = useState('paid');
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState(0);
  const [dueDate, setDueDate] = useState("");

  // Discount System
  const [discount, setDiscount] = useState({
    type: "none", // "none", "percentage", "fixed"
    value: 0,
    reason: ""
  });

  // Sample Products Data
  const products = [
    { id: 1, name: "Cement Bag (50kg)", price: 1200, stock: 50, code: "CMT-001" },
    { id: 2, name: "Steel Rod (1m)", price: 350, stock: 120, code: "STR-002" },
    { id: 3, name: "Paint (5L)", price: 2800, stock: 15, code: "PNT-003" },
    { id: 4, name: "Nails (1kg)", price: 450, stock: 80, code: "NLS-004" },
    { id: 5, name: "Hammer", price: 1000, stock: 30, code: "HMR-005" }
  ];

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (discount.type === "percentage") {
    discountAmount = subtotal * (discount.value / 100);
  } else if (discount.type === "fixed") {
    discountAmount = discount.value;
  }

  const totalAmount = subtotal - discountAmount;
  const balance = amountPaid - totalAmount;

  // Cart Functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity,
        discount: 0 // Can add per-item discount later
      }]);
    }
    
    setQuantity(1);
    setSearchTerm("");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const saleData = {
      customer,
      items: cart,
      payment: {
        type: paymentType,
        method: paymentType === 'paid' ? paymentMethod : null,
        amountPaid: paymentType === 'paid' ? amountPaid : 0,
        dueDate: paymentType === 'take_now' ? dueDate : null
      },
      discount: {
        type: discount.type,
        value: discount.value,
        amount: discountAmount,
        reason: discount.reason
      },
      subtotal,
      totalAmount,
      date: new Date().toISOString()
    };

    console.log("Sale Completed:", saleData);
    alert(paymentType === 'paid' 
      ? `Sale recorded! Total: LKR ${totalAmount.toLocaleString()}` 
      : `Products recorded as taken. Due: ${new Date(dueDate).toLocaleDateString()}`);
    
    // Reset form after submission
    setCart([]);
    setAmountPaid(0);
    setDiscount({ type: "none", value: 0, reason: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#00005A]">New Sale</h2>
        
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Customer Name*</label>
              <input
                type="text"
                placeholder="Enter customer name"
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                value={customer.name}
                onChange={(e) => setCustomer({...customer, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number*</label>
              <input
                type="text"
                placeholder="Enter contact number"
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                value={customer.contact}
                onChange={(e) => setCustomer({...customer, contact: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter address (optional)"
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                value={customer.address}
                onChange={(e) => setCustomer({...customer, address: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Add Products */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Add Products</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or product code..."
                className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
              >
                <FiMinus />
              </button>
              <input
                type="number"
                min="1"
                className="border border-gray-300 p-2 rounded-lg w-16 text-center"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Product Search Results */}
          {searchTerm && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              {filteredProducts.length > 0 ? (
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {filteredProducts.map(product => (
                    <li key={product.id} className="p-3 hover:bg-gray-50 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Code: {product.code}</span>
                          <span>Price: LKR {product.price.toLocaleString()}</span>
                          <span>Stock: {product.stock}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-[#8B000B] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#6D0009]"
                        disabled={product.stock <= 0}
                      >
                        {product.stock > 0 ? "Add" : "Out of Stock"}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-center text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Sale Items</h3>
          {cart.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.code}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        LKR {item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                        >
                          <FiTrash2 size={14} /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No items added to the sale yet</p>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">LKR {subtotal.toLocaleString()}</span>
              </div>
              
              {/* Discount Section */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount:</span>
                <div className="flex items-center gap-2">
                  <select 
                    className="border border-gray-300 p-1 rounded text-sm"
                    value={discount.type}
                    onChange={(e) => setDiscount({...discount, type: e.target.value, value: 0})}
                  >
                    <option value="none">No Discount</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                  
                  {discount.type !== "none" && (
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max={discount.type === "percentage" ? 100 : subtotal}
                        className="border border-gray-300 p-1 rounded w-16 text-right"
                        value={discount.value}
                        onChange={(e) => {
                          const max = discount.type === "percentage" ? 100 : subtotal;
                          const val = Math.min(parseFloat(e.target.value) || 0, max);
                          setDiscount({...discount, value: val});
                        }}
                      />
                      <span className="ml-1 text-sm">
                        {discount.type === "percentage" ? "%" : "LKR"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {discount.type !== "none" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount Amount:</span>
                    <span className="text-red-600">- LKR {discountAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-700 font-medium">Total:</span>
                    <span className="text-lg font-bold text-[#00005A]">
                      LKR {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Payment */}
            <div className="space-y-4">
              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Payment Type*</label>
                <select
                  className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                  value={paymentType}
                  onChange={(e) => {
                    setPaymentType(e.target.value);
                    if (e.target.value === 'paid') setAmountPaid(totalAmount);
                  }}
                  required
                >
                  <option value="paid">Pay Now</option>
                  <option value="take_now">Take Now, Pay Later</option>
                </select>
              </div>

              {/* Payment Method (shown only when paying now) */}
              {paymentType === 'paid' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method*</label>
                  <select
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
              )}

              {/* Due Date (shown only for take now, pay later) */}
              {paymentType === 'take_now' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Expected Payment Date*</label>
                  <input
                    type="date"
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Amount Paid (shown only when paying now) */}
              {paymentType === 'paid' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Amount Paid*</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
              )}

              {/* Balance/Due Display */}
              {paymentType === 'paid' && amountPaid > 0 && (
                <div className={`p-3 rounded-lg ${balance >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {balance >= 0 ? (
                    <p>Balance to Return: LKR {balance.toLocaleString()}</p>
                  ) : (
                    <p>Amount Due: LKR {Math.abs(balance).toLocaleString()}</p>
                  )}
                </div>
              )}

              {/* Discount Reason (optional) */}
              {discount.type !== "none" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Discount Reason (Optional)</label>
                  <input
                    type="text"
                    placeholder="E.g., Wholesale customer, special offer"
                    className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                    value={discount.reason}
                    onChange={(e) => setDiscount({...discount, reason: e.target.value})}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button 
            type="button"
            className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={() => {
              if (cart.length > 0 && !confirm("Are you sure you want to cancel this sale?")) return;
              setCart([]);
              setAmountPaid(0);
            }}
          >
            Cancel
          </button>
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={cart.length === 0 || (paymentType === 'take_now' && !dueDate)}
            className={`px-6 py-2 rounded-lg text-white ${
              cart.length === 0 || (paymentType === 'take_now' && !dueDate) 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } transition-colors`}
          >
            {paymentType === 'paid' ? 'Confirm Sale' : 'Record Takeaway'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewSale;