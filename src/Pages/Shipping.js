import { Stepper } from "react-form-stepper";
import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "./../Redux/Action/CartActions";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Shipping = () => {
  // console.log(Country.getAllCountries())
  // console.log(State.getAllStates())
  const history = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(shippingAddress);
  const [country, setCountry] = React.useState(shippingAddress?.country);
  const [state, setState] = React.useState(shippingAddress?.state);
  const [city, setCity] = React.useState(shippingAddress?.city);
  const [name, setName] = React.useState(shippingAddress?.name);
  const [address, setAddress] = React.useState({
    street: shippingAddress?.address?.street,
    unit: shippingAddress?.address?.unit,
  });

  console.log(address);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (country && state && city && name && address) {
      dispatch(saveShippingAddress({ name, country, state, city, address }));
      history("/payment");
    }
  };
  const handleBack = (e) => {
    e.preventDefault();

    history("/cart");
  };

  return (
    <div className="ship py-5">
      <CheckoutWizard activeStep={0} />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 col-12 shipping-wrapper">
            <h1 className="mb-4 mt-4">Shipping Address</h1>
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Full name (First and Last name)
              </label>
              <input
                type="text"
                className="form-control w-100"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Country/Region
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setCountry(e.target.value)}
                required
                value={country}
              >
                <option selected>Select Country</option>
                {Country.getAllCountries().map((country) => {
                  return (
                    <option value={country.isoCode}>{country.name}</option>
                  );
                })}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                State
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setState(e.target.value)}
                required
                value={state}
              >
                <option selected>Select State</option>
                {State.getStatesOfCountry(country).map((state) => {
                  return <option value={state.isoCode}>{state.name}</option>;
                })}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                City
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              >
                <option selected>Select City</option>
                {City.getCitiesOfState(country, state).map((city) => {
                  return (
                    <option value={city.isoCode} required>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control w-100"
                placeholder="Street addresss or P.O. Box"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                required
                value={address.street}
              />
              <input
                type="text"
                className="form-control w-100 mt-2"
                placeholder="Apt, suite, unit, building, floor, etc"
                onChange={(e) =>
                  setAddress({ ...address, unit: e.target.value })
                }
                required
                value={address.unit}
              />
            </div>

            <div className="d-flex gap-55">
              <button
                className="w-25 p-2 ship-btn mb-3"
                onClick={(e) => handleSubmit(e)}
              >
                Use this Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
