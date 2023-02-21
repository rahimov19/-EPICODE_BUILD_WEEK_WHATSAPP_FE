/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { PencilFill, CameraFill, CheckLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getMyUserDetailsAction } from "../redux/actions";

export default function UserInfo() {
  const [show, setShow] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [input2Disabled, setInput2Disabled] = useState(true);
  const [addImageClass, setAddImageClass] = useState(false);
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.chats.user);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [penIsClicked, setPenIsClicked] = useState(true);
  const [pen2IsClicked, setPen2IsClicked] = useState(true);

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = useSelector((state) => state.chats.accessToken);

  const submitChangesImg = async () => {
    const formData = new FormData();

    formData.append("avatar", image);

    const options2 = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const endpoint = `${process.env.REACT_APP_BE_URL}/users/me/avatar`;
      const response = await fetch(endpoint, options2);
    } catch (error) {
      console.log(error);
    }

    dispatch(getMyUserDetailsAction(token));
  };

  const submitChangesInfo = async () => {
    const userInformation = {
      username: username,
      email: email,
    };

    const options = {
      method: "PUT",
      body: JSON.stringify(userInformation),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const endpoint = `${process.env.REACT_APP_BE_URL}/users/me`;
      const response = await fetch(endpoint, options);
      if (response.ok) {
        console.log("User information is updated successfully");
      } else {
        throw new Error("Error while uploading information");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(getMyUserDetailsAction(token));
  };

  return (
    <div>
      <img
        onClick={handleShow}
        src={user.avatar ? user.avatar : "http://placekitten.com/40"}
        alt="useravatar"
        className="navbar-user-icon"
      />

      <Modal show={show} onHide={handleClose} id="userInfoModal">
        <Modal.Header closeButton={false} id="userInfoModalHeader">
          <Modal.Title>
            <ArrowLeft onClick={handleClose} className="mr-4" />
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <div
          id="userInfoModalBody"
          className="d-flex justify-content-center py-4 bg-main"
        >
          <div className="topOfImageDiv2">
            <input
              id="avatarUpload"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                submitChangesImg();
              }}
            />
            <img
              src={user.avatar ? user.avatar : "http://placekitten.com/300"}
              alt=""
              className="userInfoModalImage"
              onMouseOver={() => setAddImageClass(true)}
            />
            <label for="avatarUpload" className="custom-file-upload">
              <div
                onMouseLeave={() => setAddImageClass(false)}
                className={
                  addImageClass
                    ? "d-flex flex-column justify-content-center align-items-center topOfImageDiv"
                    : " d-flex flex-column justify-content-center align-items-center disabledTopOfImage"
                }
              >
                <CameraFill className="iconTop mt-3" />
                <p>Change pic</p>
              </div>
            </label>
          </div>
        </div>
        <div id="userInfoModalUnderBody" className="bg-main">
          <p>Your Name</p>
          <div className="d-flex">
            <input
              type="text"
              id="nameInput"
              onChange={(e) => setUsername(e.target.value)}
              defaultValue={user.username}
              disabled={inputDisabled}
            ></input>{" "}
            {penIsClicked ? (
              <PencilFill
                className="iconModal"
                onClick={() => {
                  setInputDisabled(false);
                  document.querySelector("#nameInput").focus();
                  setPenIsClicked(false);
                }}
              />
            ) : (
              <CheckLg
                className="iconModal"
                onClick={() => {
                  submitChangesInfo();
                  setPenIsClicked(true);
                }}
              />
            )}
          </div>
          <p>Your Email</p>
          <div className="d-flex">
            <input
              type="text"
              id="emailInput"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={input2Disabled}
            ></input>{" "}
            {pen2IsClicked ? (
              <PencilFill
                className="iconModal"
                onClick={() => {
                  setInput2Disabled(false);
                  document.querySelector("#emailInput").focus();
                  setPen2IsClicked(false);
                }}
              />
            ) : (
              <CheckLg
                className="iconModal"
                onClick={() => {
                  submitChangesInfo();
                  setPen2IsClicked(true);
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
