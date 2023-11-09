import React, { useEffect, useState } from "react";
import { Stack, Box, Tabs, Tab } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchSentRequests,
  FetchUsers,
} from "../../redux/slices/app";
import {
  UserElement,
  FriendRequestElement,
  FriendElement,
  SentRequestElement,
} from "../../components/Friends";
import "../../global.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, [dispatch]);

  return (
    <Stack p={2} spacing={2}>
      <Stack
        direction="column"
        className={"scrollbar"}
        sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
      >
        <Stack spacing={2.4}>
          <Stack spacing={2}>
            {users.map((el, index) => {
              return <UserElement key={index} {...el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  const { friends } = useSelector((state) => state.app);
  return (
    <Stack p={2} spacing={2}>
      <Stack
        direction="column"
        className={"scrollbar"}
        sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
      >
        <Stack spacing={2.4}>
          <Stack spacing={2}>
            {friends.map((el, index) => {
              return <FriendElement key={index} {...el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const FriendRequestsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, [dispatch]);

  const { friendRequests } = useSelector((state) => state.app);

  return (
    <Stack p={2} spacing={2}>
      <Stack
        direction="column"
        className={"scrollbar"}
        sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
      >
        <Stack spacing={2.4}>
          <Stack spacing={2}>
            {friendRequests.map((el, index) => {
              return (
                <FriendRequestElement key={index} {...el.sender} id={el._id} />
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const SentList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchSentRequests());
  }, [dispatch]);

  let { sentRequests } = useSelector((state) => state.app);

  if (!sentRequests) {
    sentRequests = [];
  }

  return (
    <Stack p={2} spacing={2}>
      <Stack
        direction="column"
        className={"scrollbar"}
        sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
      >
        <Stack spacing={2.4}>
          <Stack spacing={2}>
            {sentRequests.map((el, index) => {
              return (
                <SentRequestElement key={index} {...el.recipient} id={el._id} />
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Explore = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState(0);
  // const [loading, setLoading] = useState(false);

  const { users, friends, friendRequests, sentRequests } = useSelector(
    (state) => state.app
  );

  const { sideBar } = useSelector((store) => store.app);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (query, value) => {
    if (query) {
      console.log(query, value);
      // setLoading(true);
      switch (value) {
        case 0:

          break;

        case 1:
          break;

        case 2:
          break;

        case 3:
          break;

        default:
          break;
      }
      // setLoading(false);
    } else {
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
      }}
    >
      <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
        <Box
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Box p={2} width={"100%"}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Explore" />
                <Tab label="Friends" />
                <Tab label="Requests" />
                <Tab label="Sent" />
              </Tabs>
            </Box>
            {/* Search */}
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search.."
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value, value)}
                />
              </Search>
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            height: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{
              height: "100%",
            }}
          >
            <Stack spacing={2.4}>
              {value === 0 && <UsersList />}
              {value === 1 && <FriendsList />}
              {value === 2 && <FriendRequestsList />}
              {value === 3 && <SentList />}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Explore;
