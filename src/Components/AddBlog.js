import React, { useState } from "react";

import { db } from "./Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function AddBlog() {
  const [addBlog, setAddBlog] = useState({
    name: "",
    title: "",
    url: "",
    description: "",
  });
  const Navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  // console.log(addBlog);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, title, url, description } = addBlog;

    if (!name || !title || !url || !description) {
      setErrMsg("!...All field is required");
    } else {
      console.log("sub");
      setErrMsg("");
      setBtnDisable(true);
      await addDoc(collection(db, "Add"), { addBlog })
        .then(() => {
          setBtnDisable(false);
          alert("Blog Added Successfully");
          Navigate("/");
        })
        .catch((err) => {
          console.log("ERROR", err);
          setErrMsg(err.message);
          setBtnDisable(false);
        });
    }
  };
  return (
    <>
      {/* <Nav btn="Add BLog" btn2="Veiw Blog" /> */}

    <div className="text-center">

    <div className="add-inner2 m-auto">
                <div className="add-form-head">
                  <h3 className="pt-5">
                    <em>ADD BLOG </em>
                  </h3>
                </div>
                <div className="signup-box mt-3 ">
                <form className=" ">
                <label htmlFor="" className="h3">Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    onChange={(e) =>
                      setAddBlog((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <label htmlFor="" className="h3">Title:</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter Blog title"
                    onChange={(e) =>
                      setAddBlog((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <label htmlFor="" className="h3">Url:</label>
                  <input
                    type="url"
                    name="url"
                    placeholder="Enter  image url"
                    required
                    onChange={(e) =>
                      setAddBlog((prev) => ({ ...prev, url: e.target.value }))
                    }
                  />
                <label htmlFor="" className="h3">Description:</label>
                  <textarea
                  style={{width:"300px"}}
                    name="description"
                    id="productdis"
                    cols="50"
                    rows="4"
                    placeholder="Write Blog here...."
                    onChange={(e) =>
                      setAddBlog((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  ></textarea>
                  <b className="err-msg"> {errMsg}</b>
                  <div className="add-submit">
                    <button
                      onClick={onSubmit}
                      disabled={btnDisable}
                      className="btn btn-success rounded-5"
                    >
                      ADD Blog
                    </button>
                  </div>
                  <p className="add-logtext">Click Submit to Add Blog.</p>
                </form>
                </div>
              </div>
    </div>
    </>
  );
}

export default AddBlog;