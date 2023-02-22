import React, { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { ArrowLeft, Search } from "react-bootstrap-icons";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { createNewChatAction, CREATE_NEW_CHAT } from "../redux/actions";

export default function NewChatModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const accessToken = useSelector((state) => state.chats.accessToken);
  const mainUser = useSelector((state) => state.chats.user);
  const mainUserId = mainUser._id;
  const optionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const dispatch = useDispatch();
  const fetchUsers = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users`,
        optionsGet
      );
      if (response.ok) {
        let users = await response.json();
        setUsers(users);
        console.log(users);
      } else {
        console.log("error while fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterFunction = (query) => {
    const newFilter = users ? (
      users.filter((value) => {
        return value.username.toLowerCase().includes(query.toLowerCase());
      })
    ) : (
      <></>
    );

    if (query.length > 0) {
      setFilteredData(newFilter);
    } else {
      setFilteredData([]);
    }
  };
  useEffect(() => {
    filterFunction(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const openNewChatHandler = (userId, accessToken, handleClose) => {
    const newChat = {
      type: "private",
      members: [userId],
      firstMessage: "placeholder", // need to update from chat input
    };
    dispatch({ type: CREATE_NEW_CHAT, payload: newChat });

    // dispatch(createNewChatAction(newChat, accessToken, handleClose));
  };
  return (
    <div>
      <Icon.ChatLeftTextFill
        className="iconTop"
        onClick={() => {
          handleShow();
          fetchUsers();
        }}
      />

      <Modal show={show} onHide={handleClose} id="userInfoModal2">
        <Modal.Header closeButton={false} id="userInfoModalHeader">
          <Modal.Title>
            <ArrowLeft onClick={handleClose} className="mr-4" /> New Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-main modalBody">
          <div>
            <div className="flex-utility justify-content-between align-items-center">
              <div className="py-2 flex-grow-1  mr-2">
                <InputGroup
                  className="px-3"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                >
                  <InputGroup.Text id="basic-addon1">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    className="input-search-bg"
                    placeholder="Search for a user to start conversation"
                  />
                </InputGroup>
              </div>
            </div>
            <div className="mt-3">
              {filteredData.length !== 0 ? (
                filteredData.map((user) =>
                  user._id !== mainUserId ? (
                    <div className="d-flex userSearchUser" key={user._id}>
                      <div className="mr-3">
                        <img
                          className="userAvatar"
                          src={
                            user.avatar
                              ? user.avatar
                              : "http://placekitten.com/50"
                          }
                          alt="useravatar"
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center userSearchText">
                        <h4>{user.username}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )
              ) : users ? (
                users.map((user) =>
                  user._id !== mainUserId ? (
                    <div
                      className="d-flex userSearchUser"
                      key={user._id}
                      onClick={() => {
                        openNewChatHandler(user._id, accessToken, handleClose);
                      }}
                    >
                      <div className="mr-3 d-flex align-items-center">
                        <img
                          className="userAvatar"
                          src={
                            user.avatar
                              ? user.avatar
                              : "http://placekitten.com/50"
                          }
                          alt="useravatar"
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center userSearchText">
                        <h4>{user.username}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
