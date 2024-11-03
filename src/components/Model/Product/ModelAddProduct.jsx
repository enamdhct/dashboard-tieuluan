import React, { useEffect,useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default function ModelAddProduct({isOpen, onClose}) {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    console.log(isOpen);
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
      };
  return (
      <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
              isOpen ? "block" : "hidden"
          }`}
      >
          <div className="modal-content bg-white p-8 rounded shadow-md w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Thêm sản phẩm</h2>
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <label
                          htmlFor="productName"
                          className="block text-sm font-medium text-gray-700"
                      >
                          Tên sản phẩm
                      </label>
                      <input
                          type="text"
                          id="productName"
                          className="mt-1 p-2 w-full border rounded"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                      />
                  </div>
                  <div className="mb-4">
                      <label
                          htmlFor="productCategory"
                          className="block text-sm font-medium text-gray-700"
                      >
                          Loại sản phẩm
                      </label>
                      <input
                          type="text"
                          id="productCategory"
                          className="mt-1 p-2 w-full border rounded"
                          value={productCategory}
                          onChange={(e) => setProductCategory(e.target.value)}
                          required
                      />
                  </div>
                  <div className="flex justify-end flex-row gap-4 rounded">
                        <button onClick={onClose} className="bg-slate-200 p-2">
                            Hủy
                      </button>
                      <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                          Thêm
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
}
