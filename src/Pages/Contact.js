import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import {
  FaAddressBook,
  FaBook,
  FaCalendarTimes,
  FaPhone,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <div className="contact-banner">
        <div>
          <h2>#Lets_Talk</h2>
          <p>LEAVE A MESSAGE, We love to hear from you</p>
        </div>
        {/* <img src='/images/womenb.jpg'className='img-fluid'/> */}
      </div>
      <BreadCrumb title="Contact" />
      <section className="contact-wrapper py-2">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-sm-6 col-12">
              <div className="contact-title">
                <h4>GET IN TOUCH</h4>
                <h4>Visit one of our agency locations or contact us today</h4>
                <h4 className="mt-3 mb-3">Head Office</h4>
              </div>
              <div className="contact-content">
                <div className="contact-details">
                  <div className="contact-font">
                    <FaBook fa className="fa" />
                  </div>
                  <p>Road E 35 Flat 5A, kaduna Estate, Ajaoukuta, Kogi State</p>
                </div>
                <div className="contact-details">
                  <div className="contact-font">
                    <FaAddressBook className="fa" />
                  </div>
                  <p>
                    <a href="mailto:davidodimayo@gmail.com" className="hotline">
                      davidodimayo7@gmail.com
                    </a>{" "}
                  </p>
                </div>
                <div className="contact-details">
                  <div className="contact-font">
                    <FaPhone className="fa" />
                  </div>
                  <p>
                    <a href="tel:+234 8103193091" className="hotline">
                      +234 8103193091
                    </a>{" "}
                  </p>
                </div>
                <div className="contact-details">
                  <div className="contact-font">
                    <FaCalendarTimes className="fa" />
                  </div>
                  <p>Monday to Saturday, 9.00AM-18PM</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2019869.5571885896!2d6.569249241139839!3d8.590448420807235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104f5e0fea6fe187%3A0x22ba4f350441336d!2sLokoja%2C%20Kogi!5e0!3m2!1sen!2sng!4v1685231224048!5m2!1sen!2sng"
                width="400"
                height="450"
                className="map"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-wrapper py-3 px-3 mt-3">
        <div className="container">
          <div className="row contact-container gx-5">
            <div className="col-md-8 col-12">
              <div className="contact-us">
                <h4>LEAVE A MESSAGE</h4>
                <h4>We love to hear from you</h4>
                <form
                  className="contact-form"
                  target="_blank"
                  action="https://formsubmit.co/0f2d4b58bdd39904b292bc11beedd40b"
                  method="POST"
                >
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Your Name"
                      name="name"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Subject"
                      name="subject"
                    />
                  </div>
                  <div class="mb-3">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Your Message"
                      name="message"
                    ></textarea>
                  </div>
                  <button className="contact-btn">Submit</button>
                </form>
              </div>
            </div>
            <div className="col-md-4 col-12 mt-md-0 mt-5 contact-address">
              <div>
                <div className="d-flex gap-55 im">
                  {/* <div className='contact-profile-img'> */}
                  <img src="/images/dave.jpg" className="img-fluid" />
                  {/* </div> */}
                  <div className="contact-name">
                    <h3>David Odimayo</h3>
                    <h3>Senior Software Enginerr</h3>
                    <h3>Phone: 08103193091</h3>
                    <h3>Email: davidodimayo7@gmail.com</h3>
                  </div>
                </div>
                <div className="d-flex gap-55 im">
                  {/* <div className='contact-profile-img'> */}
                  <img src="/images/pius.jpg" className="img-fluid" />
                  {/* </div> */}
                  <div className="contact-name">
                    <h3>Ikeoba Pius</h3>
                    <h3>Senior Software Enginerr</h3>
                    <h3>Phone: 08103193091</h3>
                    <h3>Email: davidodimayo7@gmail.com</h3>
                  </div>
                </div>
                <div className="d-flex gap-55 im">
                  {/* <div className='contact-profile-img'> */}
                  <img src="/images/seid.jpg" className="img-fluid" />
                  {/* </div> */}
                  <div className="contact-name">
                    <h3>Ahmed Seidhat</h3>
                    <h3>Senior Graphic Designer</h3>
                    <h3>Phone: 08103193091</h3>
                    <h3>Email: davidodimayo7@gmail.com</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
