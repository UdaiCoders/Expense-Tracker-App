// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import { registerAPI } from "../../utils/ApiRequest";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleLoginClick = () => {
    setIsActive(false); // Activate the login form
    setErrorMessage(""); // Clear any previous error messages
  };
  const handleLoginChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handlers to toggle between forms
  const handleRegisterClick = () => {
    setIsActive(true); // Activate the register form
    setErrorMessage(""); // Clear any previous error messages
  };
  const handleRegisterChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    setLoading(true);

    const { data } = await axios.post(loginAPI, {
      email,
      password,
    });

    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      toast.success(data.message, toastOptions);
      setLoading(false);
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    setLoading(false);

    const { data } = await axios.post(registerAPI, {
      name,
      email,
      password,
    });

    if (data.success === true) {
      delete data.user.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);
      setLoading(true);
      navigate("/");
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      {/* Background elements */}
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* Login Form */}
      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 21 }}>
          Login
        </h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="email"
              required
              name="email"
              onChange={handleLoginChange}
              value={values.email}
            />
            <label>Email</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
            <input
              type="password"
              required
              name="password"
              onChange={handleLoginChange}
              value={values.password}
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 3, "--j": 24,
            "background":"black",
            "color":"white"                      
             }}
          >
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 }}>
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                className="register-link"
                onClick={handleRegisterClick}
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Login Info Text */}
      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 20 }}>
          Welcome Back!
        </h2>
        <p className="animation" style={{ "--i": 1, "--j": 21 }}>
          Please log in to continue your journey with us.
        </p>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
          Sign Up
        </h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              required
              name="name"
              onChange={handleRegisterChange}
              value={values.name}
            />
            <label>Name</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="email"
              required
              name="email"
              onChange={handleRegisterChange}
              value={values.email}
            />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="password"
              required
              name="password"
              onChange={handleRegisterChange}
              value={values.password}
            />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 21, "--j": 4,"background":"black",
            "color":"white" }}
          >
            Sign Up
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 }}>
            <p>
              Already have an account?{" "}
              <a href="#" className="login-link" onClick={handleLoginClick}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Register Info Text */}
      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
          Join us today!
        </h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 }}>
          Create your account to get started now.
        </p>
      </div>
    </div>

    // <div style={{ position: "relative", overflow: "hidden" }}>
    //   <Particles
    //     id="tsparticles"
    //     init={particlesInit}
    //     loaded={particlesLoaded}
    //     options={{
    //       background: {
    //         color: {
    //           value: "#000",
    //         },
    //       },
    //       fpsLimit: 60,
    //       particles: {
    //         number: {
    //           value: 200,
    //           density: {
    //             enable: true,
    //             value_area: 800,
    //           },
    //         },
    //         color: {
    //           value: "#ffcc00",
    //         },
    //         shape: {
    //           type: "circle",
    //         },
    //         opacity: {
    //           value: 0.5,
    //           random: true,
    //         },
    //         size: {
    //           value: 3,
    //           random: { enable: true, minimumValue: 1 },
    //         },
    //         links: {
    //           enable: false,
    //         },
    //         move: {
    //           enable: true,
    //           speed: 2,
    //         },
    //         life: {
    //           duration: {
    //             sync: false,
    //             value: 3,
    //           },
    //           count: 0,
    //           delay: {
    //             random: {
    //               enable: true,
    //               minimumValue: 0.5,
    //             },
    //             value: 1,
    //           },
    //         },
    //       },
    //       detectRetina: true,
    //     }}
    //     style={{
    //       position: "absolute",
    //       zIndex: -1,
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //     }}
    //   />
    //   <Container
    //     className="mt-5"
    //     style={{ position: "relative", zIndex: "2 !important" }}
    //   >
    //     <Row>
    //       <Col md={{ span: 6, offset: 3 }}>
    //         <h1 className="text-center mt-5">
    //           <AccountBalanceWalletIcon
    //             sx={{ fontSize: 40, color: "white" }}
    //             className="text-center"
    //           />
    //         </h1>
    //         <h2 className="text-white text-center ">Login</h2>
    //         <Form>
    //           <Form.Group controlId="formBasicEmail" className="mt-3">
    //             <Form.Label className="text-white">Email address</Form.Label>
    //             <Form.Control
    //               type="email"
    //               placeholder="Enter email"
    //               name="email"
    //               onChange={handleChange}
    //               value={values.email}
    //             />
    //           </Form.Group>

    //           <Form.Group controlId="formBasicPassword" className="mt-3">
    //             <Form.Label className="text-white">Password</Form.Label>
    //             <Form.Control
    //               type="password"
    //               name="password"
    //               placeholder="Password"
    //               onChange={handleChange}
    //               value={values.password}
    //             />
    //           </Form.Group>
    //           <div
    //             style={{
    //               width: "100%",
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "center",
    //               flexDirection: "column",
    //             }}
    //             className="mt-4"
    //           >
    //             <Link to="/forgotPassword" className="text-white lnk">
    //               Forgot Password?
    //             </Link>

    //             <Button
    //               type="submit"
    //               className=" text-center mt-3 btnStyle"
    //               onClick={!loading ? handleSubmit : null}
    //               disabled={loading}
    //             >
    //               {loading ? "Signin…" : "Login"}
    //             </Button>

    //             <p className="mt-3" style={{ color: "#9d9494" }}>
    //               Don't Have an Account?{" "}
    //               <Link to="/register" className="text-white lnk">
    //                 Register
    //               </Link>
    //             </p>
    //           </div>
    //         </Form>
    //       </Col>
    //     </Row>
    //     <ToastContainer />
    //   </Container>
    // </div>
  );
};

export default Login;
