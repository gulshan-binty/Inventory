import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PurchaseItem = () => {
  const [items, setItems] = useState([
    { item: "", quantity: 0, unitPrice: 0, linePrice: 0 },
  ]);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseValidDate, setPurchaseValidDate] = useState("");
  const [vendorOptions, setVendorOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [note, setNote] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vendors from the backend
    axios
      .get("http://localhost:5000/inventory/vendor")
      .then((response) => {
        const options = response.data.map((vendor) => ({
          value: vendor.vendor_id,
          label: vendor.name,
        }));
        setVendorOptions(options);
      })
      .catch((error) => {
        console.error("There was an error fetching the vendor data!", error);
      });

    // Fetch items from the backend
    axios
      .get("http://localhost:5000/inventory/item")
      .then((response) => {
        const options = response.data.map((item) => ({
          value: item.item_id,
          label: item.item_name,
        }));
        setItemOptions(options);
      })
      .catch((error) => {
        console.error("There was an error fetching the item data!", error);
      });
  }, []);

  const handleAddItem = () => {
    setItems([...items, { item: "", quantity: 0, unitPrice: 0, linePrice: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          newItem.linePrice = newItem.quantity * newItem.unitPrice;
        }
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    updateTotals(newItems);
  };

  const updateTotals = (newItems) => {
    const totalQuantity = newItems.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    const totalPrice = newItems.reduce(
      (sum, item) => sum + Number(item.linePrice),
      0
    );
    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  };

  const handleSubmit = async () => {
    const vendor_id = vendor ? vendor.value : null;
    const vendor_name = vendor ? vendor.label : null;

    for (const item of items) {
      const selectedItem = itemOptions.find(
        (option) => option.value === item.item
      );

      const purchaseData = {
        purchaseDate,
        purchaseValidDate,
        item_id: item.item,
        item_name: selectedItem ? selectedItem.label : "",
        quantity: item.quantity,
        price: item.unitPrice,
        vendor_id,
        vendor_name,
      };

      console.log("Submitting purchase data:", purchaseData); // Debug log

      try {
        const response = await axios.post(
          "http://localhost:5000/inventory/purchaseItems",
          purchaseData
        );
        console.log("Purchase data submitted successfully:", response.data);
      } catch (error) {
        console.error(
          "There was an error submitting the purchase data!",
          error
        );
        return;
      }
    }

    // Navigate to the inventory tab after successful submission
    navigate("/inventory");
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Item</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Purchase Date*</Label>
          <Input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
        <div>
          <Label>Vendor*</Label>
          <CreatableSelect
            isClearable
            options={vendorOptions}
            onChange={(selectedOption) => setVendor(selectedOption)}
          />
        </div>
        <div>
          <Label>Purchase Valid Date*</Label>
          <Input
            type="date"
            value={purchaseValidDate}
            onChange={(e) => setPurchaseValidDate(e.target.value)}
          />
        </div>
        <div>
          <Label>Note</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      <div className="mb-4">
        <Label>Purchase Details</Label>
        <div className="grid grid-cols-4 gap-4">
          <div>Item</div>
          <div>Quantity</div>
          <div>Unit Price</div>
          <div>Line Price</div>
        </div>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mt-2">
            <CreatableSelect
              isClearable
              options={itemOptions} // Assuming similar structure for items
              onChange={(selectedOption) =>
                handleItemChange(index, "item", selectedOption.value)
              }
            />
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <Input
              type="number"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(index, "unitPrice", e.target.value)
              }
            />
            <Input type="number" value={item.linePrice} readOnly />
          </div>
        ))}
        <Button onClick={handleAddItem} className="mt-4 bg-gray-600 text-white">
          Add Item
        </Button>
      </div>
      <Label>Purchase Summary</Label>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label>Total Quantity</Label>
          <Input value={totalQuantity} readOnly />
        </div>
        <div>
          <Label>Total Price</Label>
          <Input value={totalPrice} readOnly />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Link
          to="/inventory"
          className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Back
        </Link>
        <Button
          className="bg-gray-600 text-white py-2 px-4"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default PurchaseItem;
