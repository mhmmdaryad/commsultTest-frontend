import React, { useEffect, useState } from "react";
import "../App.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ProductTable from "../component/productTable.js";
import ProductModal from "../component/productModal";

export default function Product() {
  const [modalShow, setModalShow] = React.useState(false);
  const isNew = useState(true);
  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-center">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 "
                    src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/13db067b90a908bad6fd230ff720fe6a.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="bg-white">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Products List{" "}
            </h1>
            <Button
              variant="contained"
              className="openModalBtn"
              startIcon={<AddIcon />}
              onClick={() => {
                setModalShow(true);
              }}
            >
              Add
            </Button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6  lg:px-9 bg-gray-200">
            <ProductTable show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </main>{" "}
        <ProductModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          isNew={isNew}
        />
      </div>
    </>
  );
}
