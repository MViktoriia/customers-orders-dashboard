import PropTypes from 'prop-types';
import { useState } from 'react';
import AddButton from './AddButton';
import { useDispatch } from 'react-redux';
import { editOrder, removeOrder } from '../redux/orders/ordersSlice';
import SecondaryButton from './SecondaryButton';

function OrderForm({ orderData, customersData, setIsModalOpen, isEdit }) {
  const disputch = useDispatch();
  const [formData, setFormData] = useState({
    date: orderData.date,
    productName: orderData.productName,
    customerId: orderData.customerId,
    customerName: orderData.customerName,
    hours: orderData.hours,
    sum: orderData.sum,
    comment: orderData.comment,
    workStatus: orderData.workStatus,
    paymentStatus: orderData.paymentStatus,
  });

  console.log(formData);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleCancelClick = event => {
    event.preventDefault();
    if (!isEdit) {
      disputch(removeOrder(orderData.id));
    }
    setIsModalOpen(false);
  };

  const onFormSubmit = event => {
    event.preventDefault();
    const editedOrder = {
      id: orderData.id,
      ...formData,
    };

    disputch(editOrder(editedOrder));
    setIsModalOpen(false);
  };

  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <p className="mb-6 text-center text-gray-700 font-medium">New order</p>
      <form id="orderForm">
        <div className="relative mb-6">
          <input
            type="date"
            id="orderDate"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <label
            htmlFor="orderDate"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Date of order
          </label>
        </div>

        <div className="relative mb-6">
          <label htmlFor="productName" className="sr-only">
            Category
          </label>
          <select
            id="productName"
            className="block rounded-t-lg py-2.5 px-2.5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="photoAndVideo">Photo and Video</option>
          </select>
        </div>

        <div className="relative mb-6">
          <label htmlFor="customer" className="sr-only">
            Customer
          </label>
          <select
            id="customer"
            className="block rounded-t-lg py-2.5 px-2.5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
          >
            {customersData.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative mb-6">
          <input
            type="number"
            id="hours"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="hours"
            value={formData.hours}
            onChange={handleChange}
          />
          <label
            htmlFor="hours"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Hours
          </label>
        </div>
        <div className="relative mb-6">
          <input
            type="number"
            id="sum"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            name="sum"
            value={formData.sum}
            onChange={handleChange}
          />
          <label
            htmlFor="sum"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Sum
          </label>
        </div>
        <div className="relative mb-6">
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-900"
          ></label>
          <textarea
            id="comment"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Additional information about order..."
            name="comment"
            value={formData.info}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="relative mb-6">
          <label htmlFor="workStatus" className="sr-only">
            Work status
          </label>
          <select
            id="workStatus"
            className="block rounded-t-lg py-2.5 px-2.5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="workStatus"
            value={formData.workStatus}
            onChange={handleChange}
          >
            <option value="done">Done</option>
            <option value="inProgress">In Progress</option>
          </select>
        </div>

        <div className="relative mb-6">
          <label htmlFor="paymentStatus" className="sr-only">
            Payment status
          </label>
          <select
            id="paymentStatus"
            className="block rounded-t-lg py-2.5 px-2.5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="flex ">
          <AddButton
            className="mr-4 flex-1"
            type="submit"
            onClick={onFormSubmit}
          >
            Save
          </AddButton>
          <SecondaryButton
            className="flex-1"
            type="submit"
            onClick={handleCancelClick}
          >
            Cancel
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;

OrderForm.propTypes = {
  orderData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    sum: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    workStatus: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
  }),
  customersData: PropTypes.array.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
};