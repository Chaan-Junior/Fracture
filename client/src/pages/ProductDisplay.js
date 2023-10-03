import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin
import "../styles/ProductDisplay.css";
import { Link } from "react-router-dom";

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      axios
        .delete(`http://localhost:3001/api/products/${id}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleNotifySupplier = (id) => {
    // Add logic to notify the supplier here
    alert(`Notifying supplier for product with ID ${id}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "#",
          "ID",
          "Product Name",
          "Description",
          "Quantity",
          "Type",
          "Supplier",
          "Price",
        ],
      ],
      body: products.map((product, index) => [
        index + 1,
        product._id,
        product.productName,
        product.productDescription,
        product.productQuantity,
        product.productType,
        product.supplierName,
        `$${product.productPrice}`,
      ]),
    });

    doc.save("Product_Report.pdf");
  };

  // Function to filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <br />
      <h1 id="heading">Available Products</h1>
      <Link className="add-product" to="/createProduct">
        Add Product
      </Link>
      <button className="generate-pdf" onClick={generatePDF}>
        Download Report
      </button>
      <br /> <br />
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product._id}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.productQuantity}</td>
              <td>{product.productType}</td>
              <td>{product.supplierName}</td>
              <td>${product.productPrice}</td>
              <td className="product-actions">
                <br />
                <div className="action-buttons">
                  <Link
                    className="update-product"
                    to={`/updateProduct/${product._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="notify-supplier"
                    onClick={() => handleNotifySupplier(product._id)}
                  >
                    Notify
                  </button>
                  <button
                    className="delete-product"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDisplay;
