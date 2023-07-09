import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOem } from "../redux/oem/action";
import CardOem from "../components/CardOem";

const Oem = () => {
  const dispatch = useDispatch();
  const { oem, loading, error } = useSelector((store) => store.oem);
  const [searchInput, setSearchInput] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [mileageSort, setMileageSort] = useState("");

  useEffect(() => {
    dispatch(getAllOem(searchInput, priceSort, mileageSort));
  }, [dispatch,searchInput, priceSort, mileageSort]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    console.log(searchInput,"inputting search")
  };

  const handlePriceSort = (event) => {
    setPriceSort(event.target.value);
    console.log(priceSort,"sorting price")
  };

  const handleMileageSort = (event) => {
    setMileageSort(event.target.value);
    console.log(mileageSort,"sorting mileage")
  };


  console.log(oem, "oem loaded");
  return (
    <div className="pt-32 mb-10">
      <div className="flex gap-10 items-center mb-8 px-20">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearch}
          className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div>
          <label htmlFor="priceSort" className="mr-2">
            Sort Price:
          </label>
          <select
            id="priceSort"
            value={priceSort}
            onChange={handlePriceSort}
            className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label htmlFor="mileageSort" className="mr-2">
            Sort Mileage:
          </label>
          <select
            id="mileageSort"
            value={mileageSort}
            onChange={handleMileageSort}
            className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-64 ">
          <span className="loading loading-infinity loading-lg text-7xl"></span>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:pl-20  px-4">
          {Array.isArray(oem) &&
            oem?.map((ele, i) => <CardOem key={ele._id} {...ele} />)}
        </div>
      )}
    </div>
  );
};

export default Oem;
