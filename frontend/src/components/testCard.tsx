import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "@/stores/useProductStore";

const TestCard = ({ product }: { product: IProduct }) => {
  const transitionName = product._id;

  return (
    <Link to={`/product/${product._id}`} className="block">
      <article className="group bg-flex flex-col sm:w-64 w-1/4 bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all">
        <div className="sm:w-64 w-1/4 overflow-hidden aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            data-transition-name={`${transitionName} image`}
            className="object-cover object-center w-full grayscale-[0.1] group-hover:grayscale-0 h-full rounded-md group-hover:scale-105 transition-all"
          />
        </div>
        <div className="p-6">
          <h3
            className="font-semibold truncate text-background"
            data-transition-name={`${transitionName} title`}
          >
            {product.name}
          </h3>
          <p
            className="text-gray-600 text-sm truncate"
            data-transition-name={`${transitionName} description`}
          >
            {product.description}
          </p>
          <div
            className="text-right mt-4"
            data-transition-name={`${transitionName} price`}
          >
            <span className="font-semibold">${product.price}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default TestCard;
