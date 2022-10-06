import io from "socket.io-client";

let socket = null;
let onlineusers = [];
export const connectWithSocketServer = (userDetails) => {
  socket = io("http://10.0.2.2:5002");

  socket.on("connect", () => {
    socket.emit("add user", userDetails);
    console.log("successfully connected with socket.io server");
    onlineusers.push(userDetails);

    // console.log(userDetails.fullname);
    // console.log(userDetails.userId);
  });

  // socket.on("action", (type, onlineUsers) => {
  //   const loggedInUsers = onlineUsers;
  //   console.log(loggedInUsers);
  // });
};

export { onlineusers };
