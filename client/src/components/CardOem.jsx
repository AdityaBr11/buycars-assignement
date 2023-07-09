import React from "react";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardOem = ({
  _id,
  Model,
  Year,
  Price,
  Mileage,
  Power,
  MaxSpeed,
  Color,
}) => {
  console.log(Color, "color");
  return (
    <div class="w-[410px] cursor-pointer">
      <Link to={`/oem/${_id}`}>
        <div class="">
          <div class=" pr-32 pl-6 py-6 text-gray-500 bg-gray-200 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-start gap-2 justify-start ">
            <p className="text-xl font-bold">{Model}</p>
            <p className="text-sm ">Year: {Year}</p>
            <p className="text-sm ">List Price: {Price}</p>
            <p className="text-sm ">Available Colors :</p>
            <div className="flex items-center gap-1">
              {Color.map((color, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full bg-${color} border border-gray-200`}
                ></div>
              ))}
            </div>
            <p className="text-sm ">Mileage: {Mileage}</p>
            <p className="text-sm ">Power: {Power} BHP</p>
            <p className="text-sm ">Max Speed: {MaxSpeed} mph</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardOem;
{
  /* <BsFillBalloonHeartFill/> */
}
