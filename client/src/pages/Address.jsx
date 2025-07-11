import React, { useState } from 'react';

const Address = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.address) formErrors.address = 'Address is required';
    if (!formData.city) formErrors.city = 'City is required';
    if (!formData.state) formErrors.state = 'State is required';
    if (!formData.pin || !/^\d{6}$/.test(formData.pin)) formErrors.pin = 'Valid pin code is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) formErrors.phone = 'Valid phone number is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      // Here you can add the logic to send the form data to the backend or handle it as needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-2">
        <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border-0 border-b-4 border-black bg-transparent rounded"
        />
        {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border-t-0 border-y-0 border-b-2 border-black bg-transparent rounded"
        />
        {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="state" className="block text-gray-700 font-bold mb-2">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-2 border-0 border-b-2 border-black bg-transparent rounded"
        />
        {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="pin" className="block text-gray-700 font-bold mb-2">Pin Code</label>
        <input
          type="text"
          id="pin"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          className="w-full p-2 border-0 border-b-2 border-black bg-transparent rounded"
        />
        {errors.pin && <p className="text-red-500 text-xs italic">{errors.pin}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border-0 border-b-2 border-b-gray-700 border-black bg-transparent rounded"
        />
        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-700 font-bold text-white py-2 px-4 rounded hover:bg-gray-600"
      >
        Next
      </button>
    </form>
  );
};

export default Address;
