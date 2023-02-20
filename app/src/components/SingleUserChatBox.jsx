const SingleUserChatBox = () => {
  return (
    <div className="flex-utility justify-content-between align-items-center chat-box-design">
      <div className="flex-grow-1 flex-utility align-items-center">
        <div className="chat-user-icon flex-utility align-items-center justify-content-center mr-3">
          image
        </div>
        <div className="flex-grow-1">
          <div>name</div>
          <div>last message</div>
        </div>
      </div>
      <div className="flex-utility align-items-center justify-content-center">
        Day/hours
      </div>
    </div>
  );
};

export default SingleUserChatBox;
