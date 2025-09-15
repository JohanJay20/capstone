

import React from "react";
import LoginForm from "../components/LoginForm";

const Welcomepage = () => {
  return (
    <>
      <div
        className="vh-100 position-relative"
        style={{
          backgroundImage: "url('/images/welcomepage.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Sign In button on top-right */}
        <div
          className="position-absolute"
          style={{
            top: "20px",
            right: "20px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#loginModalCenter"
          >
            Sign In
          </button>
        </div>

        <div className="authincation h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-md-8">
                                <div className="form-input-content text-center error-page">
                                    <div className="text-center">
                                        <img
                                            src="../images/Frame.svg" // path to your 404 image
                                            alt="404 Error"
                                            className="img-fluid"
                                            // optional sizing
                                        />
                                    </div>
                                    <h4 className="mt-3"> Your First Line of Defense Against Rat</h4>
                                    <p> Advanced ultrasonic detection and repelling, engineered for safety and reliability.</p>
                                    <div>
                                        <a className="btn btn-outline-primary" href="#"  data-toggle="modal"
            data-target="#loginModalCenter">Let's Get Started</a>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="loginModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "400px" }}
        >
          <div className="modal-content">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcomepage;