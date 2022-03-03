import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDogDetail, getDogById } from "../../actions";

const Detail = (props) => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogById(props.match.params.id));
    return () => {
      dispatch(cleanDogDetail(dispatch));
    };
  }, [dispatch, props.match.params.id]);

  //   console.log(props);
  //   console.log(dog);
  return (
    <div>
      {dog ? (
        <div>
          <h2>{dog.name}</h2>
          <p>ID: {dog.id}</p>
          <img
            src={dog.image}
            alt="img not found"
            height="300px"
            width="280px"
          />
          <div>
            <h6>Temperaments: </h6>
            {dog.temperament?.map((e, k) => {
              return <p key={k}> {e} </p>;
            })}
          </div>
          <div>
            <p>
              Weigth: {dog.weight_min} - {dog.weight_max}
            </p>
            <p>
              Height: {dog.height_min} - {dog.height_max}
            </p>
            <p>
              Life span: {dog.life_span_min} - {dog.life_span_max}
            </p>
            <p>Bred group: {dog.bred_group}</p>
            <p>Bred for: {dog.bred_for}</p>
          </div>
        </div>
      ) : (
        <div>
          <h2>Not found</h2>
        </div>
      )}
    </div>
  );
};

export default Detail;
