import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { cleanDogs, createDog, getTemperaments } from "../../actions";

const CreationForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    weight_min: 0,
    weight_max: 0,
    height_min: 0,
    height_max: 0,
    bred_for: "",
    breed_group: "",
    life_span_min: 0,
    life_span_max: 0,
    image: "",
    temperament: [],
  });

  let noEmpty = /\S+/;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  const validate = (input) => {
    let errors = {};
    if (!noEmpty.test(input.name) || input.name.length < 3) {
      errors.name =
        "Name required. Only string of more than two characters and without numbers";
    } else if (
      !validateNum.test(input.weight_min) ||
      parseInt(input.weight_min) < 1
    ) {
      errors.weight_min = "Number required. Higher than one";
    } else if (
      !validateNum.test(input.weight_max) ||
      parseInt(input.weight_max) < 1
    ) {
      errors.weight_max = "Number required. Higher than one";
    } else if (
      !validateNum.test(input.height_min) ||
      parseInt(input.height_min) < 1
    ) {
      errors.height_min = "Number required. Higher than one";
    } else if (
      !validateNum.test(input.height_max) ||
      parseInt(input.height_max) < 1
    ) {
      errors.height_max = "Number required. Higher than one";
    } else if (
      !validateNum.test(input.life_span_min) ||
      parseInt(input.life_span_min) < 1
    ) {
      errors.life_span_min = "Number required. Higher than one";
    } else if (
      !validateNum.test(input.life_span_max) ||
      parseInt(input.life_span_max) < 1
    ) {
      errors.life_span_max = "Number required. Higher than one";
    } else if (!validateUrl.test(input.image)) {
      errors.image = "URL required";
    } else if (input.temperament.length < 1) {
      errors.temperament = "Temperaments required";
    } else if (input.temperament.length > 5) {
      errors.temperament = "Max. five temperaments";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    let find = input.temperament.includes(e.target.value);
    if (!find) {
      if (input.temperament.length < 5) {
        setInput({
          ...input,
          temperament: [...input.temperament, e.target.value],
        });
        e.target.value = "Select temperaments";
      } else {
        Swal.fire({
          title: "Warning!",
          text: "Up to five temperament per breed",
          icon: "warning",
          confirmButtonText: "OK!",
        });
      }
    } else {
      Swal.fire({
        title: "Warning!",
        text: "This temperament has already been selected",
        icon: "warning",
        confirmButtonText: "OK!",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.weight_min &&
      !errors.weight_max &&
      !errors.height_min &&
      !errors.height_max &&
      !errors.bred_for &&
      !errors.breed_group &&
      !errors.life_span_min &&
      !errors.life_span_max &&
      !errors.image
    ) {
      dispatch(createDog(input));
      setInput({
        name: "",
        weight_min: 0,
        weight_max: 0,
        height_min: 0,
        height_max: 0,
        bred_for: "",
        breed_group: "",
        life_span_min: 0,
        life_span_max: 0,
        image: "",
        temperament: [],
      });
      dispatch(cleanDogs(dispatch));
      history.push("/home");
    } else {
      Swal.fire({
        title: "Warning!",
        text: "Check the form, please",
        icon: "warning",
        confirmButtonText: "OK!",
      });
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter(
        (e) => e !== e
      ),
    });
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h3>¡Create a Breed!</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.name}</p>
        <label>Weight Min</label>
        <input
          type="number"
          name="weight_min"
          value={input.weight_min}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.weight_min}</p>
        <label>Weight Max</label>
        <input
          type="number"
          name="weight_max"
          value={input.weight_max}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.weight_max}</p>
        <label>Height Min</label>
        <input
          type="number"
          name="height_min"
          value={input.height_min}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.height_min}</p>
        <label>Weight Max</label>
        <input
          type="number"
          name="height_max"
          value={input.height_max}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.height_max}</p>
        <label>Bred For</label>
        <input
          type="text"
          name="bred_for"
          value={input.bred_for}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.bred_for}</p>
        <label>Bred Group</label>
        <input
          type="text"
          name="breed_group"
          value={input.breed_group}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.breed_group}</p>
        <label>Life Span Min</label>
        <input
          type="number"
          name="life_span_min"
          value={input.life_span_min}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.life_span_min}</p>
        <label>Life Span Max</label>
        <input
          type="number"
          name="life_span_max"
          value={input.life_span_max}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.life_span_max}</p>
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={input.image}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p>{errors.image}</p>
        <label>Temperaments</label>
        <select
          name="temperament"
          value={input.temperament}
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option>Select temperaments</option>
          {temperaments.map((e, k) => {
            return (
              <option key={k} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
        {input.temperament.map((e, k) => {
          return (
            <div key={k}>
              <p>{e}</p>
              <button
                onClick={() => {
                  handleDelete(e);
                }}
              >
                x
              </button>
            </div>
          );
        })}
        <p>{errors.temperament}</p>
        <button type='submit'>Create!</button>
      </form>
    </div>
  );
};

export default CreationForm;
