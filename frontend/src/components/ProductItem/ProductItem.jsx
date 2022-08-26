import React from 'react'
import { NavLink } from 'react-router-dom';

export default function ProductItem({ product }) {
  return (
    <div className="group relative shadow hover:shadow-2xl duration-500 px-3 py-4 mt-6 mx-4 mb-5">
      <div className="  w-full relative">
        <img
          style={{
            height: "200px",
            width: "200px",
          }}
          src={product?.image}
          alt="Front of men&#039;s Basic Tee in black."
          className=" object-contain w-full h-full top-0 left-0    lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex  justify-center ">
        <div>
          <div className="text-sm text-gray-700 text-center">
            <NavLink
              to={`/productDetail/${product?._id}`}
              className="text-slate-800 hover:text-slate-800 text-center"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0  text-slate-800 "
              ></span>
              {product?.name}
            </NavLink>
          </div>
        </div>
      </div>
      <p className="mt-1 text-sm text-red-500 font-bold text-lg text-center">
        {product?.price.toLocaleString()} ₫
      </p>
      {/* <button>Thêm vào giỏ hàng</button> */}
    </div>
  );
}
