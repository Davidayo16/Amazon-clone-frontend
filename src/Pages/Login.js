import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../Redux/Action/UserAction";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./../Loading/Error/Loading";
import Message from "../Loading/Error/Error";

const Login = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const history = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  console.log("email", email, "pass", password);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  console.log(userInfo);
  React.useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <div className="login-wrapper py-4">
        <div className="row">
          <div className="col-12 d-flex r">
            <div className="login-container">
              <div className="login-logo">
                <img src="/images/amazon.png" />
              </div>
              <form className="login-card" onSubmit={(e) => handleLogin(e)}>
                {loading && <Loading />}
                {error && <Message variant="danger">{error}</Message>}
                <h2>Sign In</h2>
                <div className="login-input">
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
                <button className="login-btn">Continue</button>
                <p className="mt-3">
                  By continuing, you agree to Amazon's Conditions of Use and
                  Privacy Notice.
                </p>
                <a href="">Forgotten password?</a>
                <div className="login-bottom mt-3">
                  <div className="d-flex gap-10 justify-content-center">
                    <span></span>
                    <p>New to Amazon?</p>
                    <span></span>
                  </div>
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    <div className="create-account-btn">
                      Create your Amazon account
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

export default Login;
