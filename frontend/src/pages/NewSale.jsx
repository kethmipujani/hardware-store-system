import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiTrash2, FiPlus, FiMinus, FiChevronDown, FiArrowLeft, FiEdit, FiX, FiSave, FiPercent } from "react-icons/fi";

function NewSale() {
  const navigate = useNavigate();
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

  // Item Discount Editing
  const [editingDiscount, setEditingDiscount] = useState(null);

  // Sample Products Data
  const products = [
    { id: 1, name: "Cement Bag (50kg)", price: 1200, stock: 50, code: "CMT-001" },
    { id: 2, name: "Steel Rod (1m)", price: 350, stock: 120, code: "STR-002" },
    { id: 3, name: "Paint (5L)", price: 2800, stock: 15, code: "PNT-003" },
    { id: 4, name: "Nails (1kg)", price: 450, stock: 80, code: "NLS-004" },
    { id: 5, name: "Hammer", price: 1000, stock: 30, code: "HMR-005" }
  ];

  // Filter products(case-insensitive)
  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().startsWith(term) ||
      product.code.toLowerCase().startsWith(term)
    );
  });

  // Calculate Totals
  const calculateItemTotal = (item) => {
    const itemSubtotal = item.price * item.quantity;
    let discountAmount = 0;
    
    if (item.discount && item.discount.type !== "none") {
      if (item.discount.type === "percentage") {
        discountAmount = itemSubtotal * (item.discount.value / 100);
      } else if (item.discount.type === "fixed") {
        discountAmount = item.discount.value;
      }
    }
    
    return {
      subtotal: itemSubtotal,
      discount: discountAmount,
      total: itemSubtotal - discountAmount
    };
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cart.reduce((sum, item) => {
    const itemTotal = calculateItemTotal(item);
    return sum + itemTotal.discount;
  }, 0);
  const totalAmount = subtotal - totalDiscount;
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
        discount: {
          type: "none",
          value: 0,
          reason: ""
        }
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

  // Discount Functions
  const startEditDiscount = (item) => {
    setEditingDiscount({
      id: item.id,
      discount: { ...item.discount }
    });
  };

  const saveDiscount = () => {
    setCart(cart.map(item =>
      item.id === editingDiscount.id 
        ? { ...item, discount: editingDiscount.discount } 
        : item
    ));
    setEditingDiscount(null);
  };

  const cancelEditDiscount = () => {
    setEditingDiscount(null);
  };

  const updateDiscountValue = (field, value) => {
    setEditingDiscount({
      ...editingDiscount,
      discount: {
        ...editingDiscount.discount,
        [field]: value
      }
    });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const saleData = {
      customer,
      items: cart.map(item => ({
        ...item,
        ...calculateItemTotal(item)
      })),
      payment: {
        type: paymentType,
        method: paymentType === 'paid' ? paymentMethod : null,
        amountPaid: paymentType === 'paid' ? amountPaid : 0,
        dueDate: paymentType === 'take_now' ? dueDate : null
      },
      subtotal,
      totalDiscount,
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
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <button
          className="flex items-center text-[#00005A] hover:text-[#8B000B] mb-4"
          onClick={() => navigate('/dashboard')}
        >
          <FiArrowLeft className="mr-2" size={20} />
          Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[#00005A]">New Sale</h2>
        
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Customer Name</label>
              <input
                type="text"
                placeholder="Enter customer name"
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                value={customer.name}
                onChange={(e) => setCustomer({...customer, name: e.target.value})}
                
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
              <input
                type="text"
                placeholder="Enter contact number"
                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#00005A] focus:border-transparent"
                value={customer.contact}
                onChange={(e) => setCustomer({...customer, contact: e.target.value})}
                
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
                value={quantity === 0 ? (quantity === '' ? '' : '0') : quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuantity(val === '' ? '' : Math.max(1, parseInt(val)));
                }}
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map(item => {
                    const itemTotal = calculateItemTotal(item);
                    return (
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
                        <td className="px-4 py-4 whitespace-nowrap">
                          {editingDiscount && editingDiscount.id === item.id ? (
                            <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded border">
                              <div className="flex items-center gap-2">
                                <select 
                                  className="border border-gray-300 p-1 rounded text-sm flex-1"
                                  value={editingDiscount.discount.type}
                                  onChange={(e) => updateDiscountValue("type", e.target.value)}
                                >
                                  <option value="none">No Discount</option>
                                  <option value="percentage">Percentage</option>
                                  <option value="fixed">Fixed Amount</option>
                                </select>
                              </div>
                              
                              {editingDiscount.discount.type !== "none" && (
                                <>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      min="0"
                                      max={editingDiscount.discount.type === "percentage" ? 100 : itemTotal.subtotal}
                                      className="border border-gray-300 p-1 rounded w-full text-right"
                                      value={editingDiscount.discount.value === 0 ? (editingDiscount.discount.value === '' ? '' : '0') : editingDiscount.discount.value}
                                      onChange={(e) => {
                                        const max = editingDiscount.discount.type === "percentage" ? 100 : itemTotal.subtotal;
                                        const val = e.target.value;
                                        updateDiscountValue("value", val === '' ? '' : Math.min(parseFloat(val), max));
                                      }}
                                    />
                                    <span className="text-sm whitespace-nowrap">
                                      {editingDiscount.discount.type === "percentage" ? "%" : "LKR"}
                                    </span>
                                  </div>
                                  
                                  <input
                                    type="text"
                                    placeholder="Discount reason"
                                    className="border border-gray-300 p-1 rounded text-sm"
                                    value={editingDiscount.discount.reason}
                                    onChange={(e) => updateDiscountValue("reason", e.target.value)}
                                  />
                                  
                                  <div className="flex justify-between text-xs">
                                    <span>Discount:</span>
                                    <span className="text-red-600">
                                      - LKR {editingDiscount.discount.type === "percentage" 
                                        ? (itemTotal.subtotal * (editingDiscount.discount.value / 100)).toLocaleString()
                                        : editingDiscount.discount.value.toLocaleString()}
                                    </span>
                                  </div>
                                </>
                              )}
                              
                              <div className="flex justify-between gap-2 mt-1">
                                <button
                                  onClick={cancelEditDiscount}
                                  className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveDiscount}
                                  className="text-xs bg-[#00005A] text-white px-2 py-1 rounded hover:bg-[#00007A]"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              {item.discount.type !== "none" ? (
                                <>
                                  <span className="text-sm text-red-600">
                                    {item.discount.type === "percentage" 
                                      ? `${item.discount.value}% off` 
                                      : `LKR ${item.discount.value} off`}
                                  </span>
                                  {item.discount.reason && (
                                    <span className="text-xs text-gray-500">{item.discount.reason}</span>
                                  )}
                                </>
                              ) : (
                                <span className="text-sm text-gray-500">No discount</span>
                              )}
                              <button
                                onClick={() => startEditDiscount(item)}
                                className="text-xs text-blue-600 mt-1 flex items-center gap-1"
                              >
                                <FiEdit size={10} /> {item.discount.type !== "none" ? "Edit" : "Add"}
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <div className="flex flex-col">
                            {itemTotal.discount > 0 && (
                              <div className="text-red-600 line-through">
                                LKR {itemTotal.subtotal.toLocaleString()}
                              </div>
                            )}
                            <div className={itemTotal.discount > 0 ? "font-medium" : ""}>
                              LKR {itemTotal.total.toLocaleString()}
                            </div>
                          </div>
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
                    );
                  })}
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
              
              <div className="flex justify-between">
                <span className="text-gray-600">Total Discount:</span>
                <span className="text-red-600">- LKR {totalDiscount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-700 font-medium">Total Amount:</span>
                <span className="text-lg font-bold text-[#00005A]">
                  LKR {totalAmount.toLocaleString()}
                </span>
              </div>
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
                    value={amountPaid === 0 ? (amountPaid === '' ? '' : '0') : amountPaid}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAmountPaid(val === '' ? '' : parseFloat(val));
                    }}
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
                : 'bg-[#00005A] hover:bg-[#00007A]'
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