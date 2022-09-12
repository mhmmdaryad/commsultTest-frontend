import React, { useEffect, useState } from "react";
import "../App.css";
import ProductModal from "./productModal";

export default function ProductTable() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [id, setId] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/product")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [ProductTable]);

  return (
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              ID
            </th>
            <th scope="col" class="py-3 px-6">
              Name
            </th>
            <th scope="col" class="py-3 px-6">
              Quantity
            </th>
            <th scope="col" class="py-3 px-6">
              Price
            </th>
          </tr>
        </thead>

        {data.map((data) => (
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={data.id}
              onClick={() => {
                setId(data.id);
                setShowModal(true);
              }}
            >
              <td class="py-4 px-6">{data.id}</td>
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.name}
              </th>
              <td class="py-4 px-6">
                <a
                  href="#"
                  type="button"
                  data-modal-toggle="editUserModal"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {data.quantity}
                </a>
              </td>
              <td class="py-4 px-6">{data.price}</td>
            </tr>{" "}
          </tbody>
        ))}
      </table>
      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        id={id}
      />
    </div>
  );
}
