import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { filterTemperament, getTemperaments } from "../../actions";

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

  return (
    <div>
      <div>
      <label>Temperament</label>
        <select onChange={e => {handleFilterTemperaments(e)}}>
            <option value='all'>ALL</option>
            {
              temperaments?.map(e => {
                return (
                  <option key={e.id} value={e.name}>{e.name}</option>
                )
              })
            }
        </select>
      </div>
    </div>
  );
};

export default Filters;
