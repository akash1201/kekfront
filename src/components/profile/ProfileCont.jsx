import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/shared/button";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { updateUser } from "../../service/auth";
const ProfileCont = ({ data }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(userInfo?.email);
  const [name, setName] = useState(userInfo?.name);

  const handleSave = () => {
    const payload = {
      name: name,
    };
    updateUser(userInfo.userId, payload)
      .then((response) => {
        console.log(response);
        toast.success("User Updated Successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      <div className="w-[80vw] h-[60vh] relative shadow-xl bg-[#140a5564] rounded p-2 flex flex-col items-center justify-center gap-5">
        <input
          type="email"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
          className={` w-[60%] px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md focus:outline-nonee `}
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={` w-[60%] px-6 h-14 mb-6 border-secondary-90 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md focus:outline-none `}
        />

        <div
          className="w-[60%] flex items-start justify-center h-[8px]"
          onClick={handleSave}
        >
          <div className="button text-center">
            <Button className="text-white" type="submit">
              {loading ? (
                <div className="loader-div">
                  <ReactLoading type={"spin"} height={"50%"} width={"40%"} />
                </div>
              ) : (
                <>Update</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCont;
