import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemperament,
  getDogs,
  getTemperaments,
  orderDogs,
  cleanDogs
} from "../../actions";

const Filters = ({ setCurrentPage, setOrder }) => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  //   console.log(temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterTemperaments = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
  };

  const handleOrder = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(orderDogs(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleClearDogs = () => {
    dispatch(cleanDogs());
    dispatch(getDogs());
  };

  return (
    <div>
      <div>
        <div>
          <label>Filter by temperament</label>
          <select
            onChange={(e) => {
              handleFilterTemperaments(e);
            }}
          >
            <option value="all">ALL</option>
            {temperaments?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Order</label>
          <select
            onChange={(e) => {
              handleOrder(e);
            }}
          >
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
            <option value="weightMax">WEIGHT MAX</option>
            <option value="weightMin">WEIGHT MIN</option>
            <option value="heightMax">HEIGHT MAX</option>
            <option value="heightMin">HEIGHT MIN</option>
          </select>
        </div>
        <div>
          <button onClick={() => {handleClearDogs()}}>Clear filters</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
