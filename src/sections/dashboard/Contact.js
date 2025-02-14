import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import {
  Bell,
  CaretRight,
  Prohibit,
  Star,
  Trash,
  X,
} from "phosphor-react";
import { ToggleSidebar, UpdateSidebarType } from "../../redux/slices/app";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
import AntSwtich from "../../components/AntSwitch";
import avatarUrl from "../../utils/avatarURL";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Yes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {


  // socket.emit("clear_messages", data, (message) => {
  //   dispatch(
  //    FetchConversations({ conversations: data })
  //   )
  // });
  // dispatch(ClearCurrent());
  // dispatch(
  //   showSnackbar({
  //     severity: "success",
  //     message: `Cleared Messages Successfully!`,
  //   })
  // );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      width="100"
    >
      <DialogTitle>Delete this Conversation?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Yes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = ({ _id, email, firstName, lastName, bio, avatar }) => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const dispatch = useDispatch();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: 350,
      }}
    >
      <Stack
        direction="column"
        sx={{
          height: "100%",
          width: 350,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          width="100%"
          sx={{ height: 75, p: 2 }}
          alignItems={"center"}
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h5">Contact Info</Typography>
          <IconButton
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
          >
            <X />
          </IconButton>
        </Stack>

        <Divider />

        {/* Body */}
        <Stack
          className={"scrollbar"}
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
          }}
          p={isMobile ? 1 : 3}
          spacing={3}
        >
          {/* Avatar, Name, Phone */}
          <Stack alignItems={"center"} direction="row" spacing={2}>
            <Avatar
              src={avatarUrl(avatar)}
              alt={firstName}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {firstName} {lastName}
              </Typography>
              <Typography variant="article" fontWeight={500}>
                {email}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* About */}
          <Stack spacing={0.5}>
            <Typography variant="article">Bio</Typography>
            <Typography variant="body2">{bio}</Typography>
          </Stack>

          <Divider />

          {/* Media */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Media, Links & Docs</Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebarType("SHARED"));
              }}
              endIcon={<CaretRight />}
            >
              401
            </Button>
          </Stack>

          <Stack direction="row" spacing={2} alignItems={"center"}>
            {[1, 2, 3].map((el, index) => (
              <Box>
                <img src={faker.image.food()} key={index} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>

          <Divider />

          {/* Starred */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("STARRED"));
              }}
            >
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />

          {/* Bell and Mute Notification */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Bell size={21} />
              <Typography variant="subtitle2">Mute Notifications</Typography>
            </Stack>
            <AntSwtich />
          </Stack>

          <Divider />

          {/* Common Groups */}
          <Typography>1 group in common</Typography>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Froggy</Typography>
              <Typography variant="caption">
                Owl, Parrot, Rabbit, You
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Delete and Block */}
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
            >
              Block
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
            >
              Delete
            </Button>
          </Stack>
        </Stack>

        <Divider />

        {/* Fotter */}
        {openBlock && (
          <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
        )}
        {openDelete && (
          <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
        )}
      </Stack>
    </Box>
  );
};

export default Contact;

export { BlockDialog, DeleteDialog };
