import React, { useState, useEffect } from "react";
import "../App.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductForm(props) {
  let [data, setData] = useState([]);
  let [name, setName] = React.useState("");
  let [quantity, setQuantity] = React.useState("");
  let [price, setPrice] = React.useState("");

  useEffect(() => {
    async function loadById() {
      fetch(`http://localhost:8080/product/${props.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    }
    loadById();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (!name) {
      name = data.name;
    }
    if (!quantity) {
      quantity = data.quantity;
    }
    if (!price) {
      price = data.price;
    }
    try {
      let res = await fetch("http://localhost:8080/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          name: name,
          quantity: quantity,
          price: price,
        }),
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setQuantity("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function deleteDataById() {
    await fetch(`http://localhost:8080/product/${props.id}`, {
      method: "DELETE",
    });
    console.log("Delete successful");
    window.location.reload();
  }

  return (
    <div className="App">
      <form class="space-y-6" action="#" onSubmit={handleSubmit}>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder=""
            defaultValue={data.name}
            // value={data.name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder=""
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            defaultValue={data.quantity}
            // value={data.quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder=""
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            defaultValue={data.price}
            // value={data.price}
            onChange={(e) => setPrice(e.target.value)}
            required
          ></input>
        </div>

        <button class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
        {!props.isNew && (
          <Button
            color="error"
            variant="outlined"
            onClick={deleteDataById}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </form>
    </div>
  );
}
