"use client"
import { useState } from "react";

const CreatePropertyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    typeId: "",
    statusId: "",
    description: "",
    location: { city: "", state: "", country: "" },
    feature: { bedrooms: 0, bathrooms: 0, parkingSpaces: 0 },
    contact: { phone: "", email: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key as keyof typeof formData] as Object, [subKey]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        alert("Error: " + errorText);
        return;
      }
  
      const result = await response.json();
      console.log("Property created:", result);
      alert("Property created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Property Name"
        value={formData.name}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="text"
        name="typeId"
        placeholder="Type ID"
        value={formData.typeId}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="text"
        name="statusId"
        placeholder="Status ID"
        value={formData.statusId}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full"
      ></textarea>

      <h4>Location</h4>
      <input
        type="text"
        name="location.city"
        placeholder="City"
        value={formData.location.city}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="text"
        name="location.state"
        placeholder="State"
        value={formData.location.state}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="text"
        name="location.country"
        placeholder="Country"
        value={formData.location.country}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />

      <h4>Features</h4>
      <input
        type="number"
        name="feature.bedrooms"
        placeholder="Bedrooms"
        value={formData.feature.bedrooms}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="number"
        name="feature.bathrooms"
        placeholder="Bathrooms"
        value={formData.feature.bathrooms}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="number"
        name="feature.parkingSpaces"
        placeholder="Parking Spaces"
        value={formData.feature.parkingSpaces}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />

      <h4>Contact</h4>
      <input
        type="text"
        name="contact.phone"
        placeholder="Phone"
        value={formData.contact.phone}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />
      <input
        type="email"
        name="contact.email"
        placeholder="Email"
        value={formData.contact.email}
        onChange={handleChange}
        className="text-black border p-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Property
      </button>
    </form>
  );
};

export default CreatePropertyForm;
