import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "../Redux/Action/UserAction";
import Loading from "./../Loading/Error/Loading";
import Message from "../Loading/Error/Error";
const Register = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const[confirmPassword, setConfirmPassword]=useState('')
  console.log("name", name, "email", email, "password", password);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  console.log(userInfo, loading, error);
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  React.useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <div className="login-wrapper py-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div className="login-container">
              <div className="login-logo">
                <img src="/images/amazon.png" />
              </div>
              <form className="login-card" onSubmit={(e) => handleRegister(e)}>
                {loading && <Loading />}
                {error && <Message variant="danger">{error}</Message>}
                <h2>Sign Up</h2>
                <div className="login-input">
                  <div>
                    <label>Enter Name</label>
                    <input
                      type="text"
                      value={name}
                      required={true}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Enter Email</label>
                    <input
                      type="email"
                      value={email}
                      required={true}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Enter password</label>
                    <input
                      type="password"
                      value={password}
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button className="login-btn">Sign Up</button>
                <p className="mt-3">
                  By continuing, you agree to Amazon's Conditions of Use and
                  Privacy Notice.
                </p>
                <a href="">Forgotten password?</a>
                <div className="login-bottom reg py-3">
                  <div className="d-flex gap-10 justify-content-center">
                    <span></span>
                    <p>Already have an account?</p>
                    <span></span>
                  </div>
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    <div className="create-account-btn">
                      Sign in to your Amazon account
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
