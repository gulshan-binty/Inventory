import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Trash2 } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Product = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch purchase items from the backend
    axios
      .get("http://localhost:5000/inventory/purchaseItems")
      .then((response) => {
        setInvoices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching purchase items:", error);
      });
  }, []);
  const handleDelete = (id) => {
    // Send delete request to the backend
    axios
      .delete(`http://localhost:5000/inventory/purchaseItems/${id}`)
      .then((response) => {
        console.log("Item deleted successfully");
        // Update state to remove the deleted item
        setInvoices(invoices.filter((invoice) => invoice.purchase_id !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h2 className="text-xl font-bold">Items Purchase List</h2>
        <Link
          to="/purchaseProduct"
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">sl</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Purchase Valid Date</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-500">
          {invoices.map((invoice) => (
            <TableRow key={invoice.purchase_id}>
              <TableCell>{}</TableCell>
              <TableCell>{formatDate(invoice.purchasedate)}</TableCell>
              <TableCell>{formatDate(invoice.purchasevaliddate)}</TableCell>
              <TableCell>{invoice.item_name}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell>{invoice.vendor_name}</TableCell>
              <TableCell>
                <button onClick={() => handleDelete(invoice.purchase_id)}>
                  <Trash2 className="text-gray-500 h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
};

export default Product;
