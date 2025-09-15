import React, { useRef, useEffect } from 'react';

const CameraStream = () => {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);

   // Load from env vars
  const CAMERA_API_URL = import.meta.env.VITE_CAMERA_API_URL;

  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.src = `${CAMERA_API_URL}/video_feed1`;
    }
    if (videoRef2.current) {
      videoRef2.current.src = `${CAMERA_API_URL}/video_feed2`;
    }
  }, [CAMERA_API_URL]);
  
  const imageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    border: "2px solid #ccc",
  };
  return (
    <>
      <div className="container-fluid">
      <div className="form-head mb-sm-5 mb-3 d-flex flex-wrap align-items-center">
              <h2 className="font-w600 title mb-2 mr-auto ">Camera Stream</h2>
           </div>
        <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Camera 1</h4>
                            </div>
                            <div className="card-body ">
                                <div id="world-map" >
                                    <img ref={videoRef1} 
                      alt="Camera 1 Stream"
                      className="img-fluid"
                      style={imageStyle}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Camera 2</h4>
                            </div>
                            <div className="card-body ">
                                <div id="world-map" >
                                    <img ref={videoRef2} 
                      alt="Camera 2 Stream"
                      className="img-fluid"
                      style={imageStyle}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
    </>
  );
};

export default CameraStream;