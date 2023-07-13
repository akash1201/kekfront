import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { StaticImage } from "gatsby-plugin-image";
import Button from "../../components/shared/button";
import ReactLoading from "react-loading";
const ProfileCont = ({ data }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(userInfo.email);
  const [name, setName] = useState(userInfo.name);
  let inputRef = useRef();
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      <div className="w-[80vw] h-[60vh] relative shadow-xl bg-[#140a5564] rounded p-2 flex flex-col items-center justify-center gap-5">
        <input
          type="email"
          ref={inputRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={` w-[60%] px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md focus:outline-nonee `}
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={` w-[60%] px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md focus:outline-none `}
        />

        <div className="w-[60%] flex items-start justify-center h-[8px]">
          <div className="button text-center">
            <Button className="text-white" type="submit">
              {loading ? (
                <div className="loader-div">
                  <ReactLoading type={"spin"} height={"50%"} width={"40%"} />
                </div>
              ) : (
                <>
                  Update
                  <StaticImage
                    className="align-middle ml-3 transition-all group-hover:ml-5"
                    src="../../../data/images/icons/arrrow-icon.webp"
                    alt=""
                  />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCont;
