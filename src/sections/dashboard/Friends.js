import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import {
  UserElement,
  FriendRequestElement,
  FriendElement,
} from "../../components/Friends";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, [dispatch]);

  return (
    <>
      {users.map((el, index) => {
        return <UserElement key={index} {...el} />;
      })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  const { friends } = useSelector((state) => state.app);
  return (
    <>
      {friends.map((el, index) => {
        return <FriendElement key={index} {...el} />;
      })}
    </>
  );
};

const FriendRequestsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, [dispatch]);

  const { friendRequests } = useSelector((state) => state.app);

  return (
    <>
      {friendRequests.map((el, index) => {
        // el => { _id, sender: { _id, firstName, lastName, img, online } }
        return <FriendRequestElement key={index} {...el.sender} id={el._id} />;
      })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ p: 4 }}
      >
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Explore" />
            <Tab label="Friends" />
            <Tab label="Requests" />
          </Tabs>
        </Stack>

        {/* Dialog Content */}
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.4}>
              {value === 0 && <UsersList />}
              {value === 1 && <FriendsList />}
              {value === 2 && <FriendRequestsList />}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Friends;
