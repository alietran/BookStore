import React from 'react'

export default function ProductItem() {
  return (

    <div className="group relative shadow hover:shadow-2xl duration-500 px-3 py-4">
      <div className="  w-full relative">
        <img src="../img/3fbe7cc39c9fe08b308274a03099c1c1.webp" alt="Front of men&#039;s Basic Tee in black." className=" object-contain w-full h-full top-0 left-0    lg:w-full lg:h-full" />
      </div>
      <div className="mt-4 flex  justify-center ">
        <div>
          <h3 className="text-sm text-gray-700 text-center">
            <a href="#" className='text-slate-800 hover:text-slate-800 text-center'>
              <span aria-hidden="true" className="absolute inset-0  text-slate-800 "></span>
              Rèn Luyện Tư Duy Phản Biện
            </a>
          </h3>

        </div>

      </div>
      <p className="mt-1 text-sm text-red-500 font-bold text-lg text-center">35$</p>
      {/* <button>Thêm vào giỏ hàng</button> */}
    </div>

  )
}
