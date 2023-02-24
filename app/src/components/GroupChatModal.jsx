import React, { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { ArrowLeft, Search } from "react-bootstrap-icons";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_NEW_CHAT, fetchChatsAction } from "../redux/actions";

export default function GroupChatModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const accessToken = useSelector((state) => state.chats.accessToken);
  const mainUser = useSelector((state) => state.chats.user);
  const mainUserId = mainUser._id;

  const setMembersArray = (member) => {
    let membersArray = [];
    membersArray = [...members];
    if (membersArray.includes(member)) {
      const filteredArray = membersArray.filter((m) => m._id !== member._id);

      setMembers(filteredArray);
    } else {
      membersArray.push(member);
      setMembers(membersArray);
    }
  };

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

  const openNewChatHandler = async () => {
    const newChat = {
      type: "group",
      groupName: groupName,
      members: members,
      firstMessage: `${groupName} group is created!`,
      room: `${mainUserId}.${members[0]._id}.${groupName.replace(" ", "")}`, // need to update from chat input
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newChat),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats`,
        options
      );
      if (response.ok) dispatch(fetchChatsAction(accessToken));
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: CREATE_NEW_CHAT, payload: newChat });
    handleClose();
    // dispatch(createNewChatAction(newChat, accessToken, handleClose));
  };

  return (
    <div>
      <Icon.PeopleFill
        className="iconTop"
        onClick={() => {
          handleShow();
          fetchUsers();
        }}
      />

      <Modal show={show} onHide={handleClose} id="userInfoModal2">
        <Modal.Header closeButton={false} id="userInfoModalHeader">
          <Modal.Title>
            <ArrowLeft onClick={handleClose} className="mr-4" /> New Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-main modalBody">
          <div>
            <div className="flex-utility d-flex flex-column justify-content-between align-items-center ">
              <div className="py-2 flex-grow-1  mr-2 w-100">
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
              {members.length !== 0 ? (
                <div className="d-flex w-100">
                  <InputGroup
                    className="px-3"
                    onChange={(e) => {
                      setGroupName(e.target.value);
                    }}
                  >
                    <Form.Control
                      className="input-search-bg2"
                      placeholder="Enter a Group Name"
                    />
                  </InputGroup>
                  <div
                    className="create_chat_button"
                    onClick={() => openNewChatHandler()}
                  >
                    <Icon.ArrowRightShort />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="d-flex mt-2">
                {members.length !== 0 ? (
                  members.map((member) => (
                    <div
                      onClick={() => setMembersArray(member)}
                      className="d-flex flex-column align-items-center mx-1 groupMember"
                    >
                      <img
                        src={
                          member.avatar
                            ? member.avatar
                            : "http://placekitten.com/50"
                        }
                        alt=""
                        className="memberAvatar"
                      />
                      <p>{member.username}</p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mt-3">
              {filteredData.length !== 0 ? (
                filteredData.map((user) =>
                  user._id !== mainUserId ? (
                    <div
                      className="d-flex userSearchUser"
                      key={user._id}
                      onClick={() => {
                        setMembersArray(user);
                      }}
                    >
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
                        setMembersArray(user);
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
