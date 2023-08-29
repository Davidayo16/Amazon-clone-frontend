import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const backToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div className="go-top w-100" onClick={backToTop}>
        Back to Top
      </div>
      <footer className="py-4">
        <div className="container-xxl ">
          <div className="row">
            <div className="col-12 col-md-5 d-flex gap-55 align-items-center">
              <img src="/images/news.svg" className="img-fluid" />
              <h2>Sign Up For Newsletter </h2>
            </div>
            <div className="col-md-7  my-sm-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Email Addresss"
                  aria-label="Your Email Addresss"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4 mb-4 d-flex  flex-column ">
              <h3 className="text-white">Contact Us</h3>
              <div className="">
                <address>
                  Demo Store <br />
                  No 1240 Lokoja, Kogi State
                  <br />
                  Nigeria
                </address>
                <p>
                  <a href="tel:+234 8103193091" className="hotline">
                    +234 8103193091
                  </a>{" "}
                </p>
                <p>
                  <a href="mailto:davidodimayo@gmail.com" className="hotline">
                    davidodimayo@gmail.com
                  </a>{" "}
                </p>
              </div>

              <div className="social-btn">
                <a>
                  <FaFacebook />
                </a>
                <a>
                  <FaTwitter />
                </a>
                <a>
                  <FaLinkedin />
                </a>
                <a>
                  <FaWhatsapp />
                </a>
              </div>
            </div>
            <div className="col-12  col-sm-4 d-flex  flex-column align-items-sm-center">
              <h3 className="text-white mb-4">Quick Links</h3>
              <div className="footer-links d-flex flex-column">
                <Link className="py-2 mb-1" to={"/store"}>
                  Store
                </Link>
                <Link className="py-2 mb-1" to={"/cart"}>
                  Cart
                </Link>
                <Link className="py-2 mb-1" to={"/blog"}>
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-12 col-sm-4  d-flex  flex-column align-items-sm-center">
              <h3 className="text-white mb-4">Account</h3>
              <div className="footer-links d-flex flex-column">
                <Link className="py-2 mb-1">About</Link>
                <Link className="py-2 mb-1" to={"/contact"}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p>
                &copy;{new Date().getFullYear()} powered by Dav
                <span className="logo-x">X</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
