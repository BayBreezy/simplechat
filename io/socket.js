export default function (io) {
  let messages = [{ msg: "", roomId: "", from: "john", time: "string" }];
  let rooms = [
    {
      roomId: "",
      users: [
        {
          name: "john",
          id: "jahsv",
        },
      ],
    },
  ];
  io.on("connection", (socket) => {
    // Join the given room
    socket.on("join", (obj) => {
      socket.join(obj.roomId);

      // Add user to room
      let roomExist = rooms.filter((r) => r.roomId == obj.roomId)[0];
      if (roomExist) {
        roomExist.users.push({
          name: obj.username,
          id: socket.id,
        });
      }
      if (!roomExist) {
        rooms.push({
          roomId: obj.roomId,
          users: [
            {
              name: obj.username,
              id: socket.id,
            },
          ],
        });
      }

      // send messages from given room
      let initMessages = messages.filter((m) => m.roomId == obj.roomId);
      io.in(obj.roomId).emit("init-messages", initMessages);
      // sned room members
      let roomMembers = rooms.filter((r) => r.roomId == obj.roomId)[0];
      io.in(obj.roomId).emit("user-list", roomMembers.users);

      // notify other users
      socket.to(obj.roomId).emit("new-user-joined", obj.username);
    });

    //Send message to room
    socket.on("new-msg", (obj) => {
      messages.push(obj);

      // send to all other room members
      socket.to(obj.roomId).emit("new-msg", obj);
    });

    // user left
    socket.on("disconnect", (reason) => {
      // remove user from room's userlist
      rooms.forEach((r) => {
        r.users = r.users.filter((u) => u.id != socket.id);
        io.in(r.roomId).emit("user-list", r.users);
      });
    });
  });
}
