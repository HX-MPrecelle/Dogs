import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import Pagination from "../Pagination/Pagination";
import Card from "../Card/Card";

const Home = () => {
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  console.log(temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(12);
  const [order, setOrder] = useState(""); //Para modificar el estado local y me ayude al renderizado
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div>
      {dogs.length > 0 ? (
        <div>
          <div>
            <div>
              <h1>Filters</h1>
              <button>Botoncito</button>
            </div>
            <div>
              <div>
                <Pagination
                  dogsPerPage={dogsPerPage}
                  dogs={dogs.length}
                  pagination={pagination}
                />
              </div>
              <div>
                {currentDogs?.map((e, k) => {
                  return (
                    <div key={k}>
                      <Card
                        key={k}
                        id={e.id}
                        name={e.name}
                        image={e.image}
                        temperaments={e.temperaments}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

export default Home;
