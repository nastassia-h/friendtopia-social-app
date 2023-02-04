import { Box, Typography, useTheme } from "@mui/material"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "state"
import { MoreHorizOutlined } from "@mui/icons-material"

const FriendsListWidget = ({ userId }) => {
   const dispatch = useDispatch();
   const { palette } = useTheme();
   const token = useSelector((state) => state.token);
   const friends = useSelector((state) => state.user.friends);

   const getFriends = async () => {
      const response = await fetch(
         `http://localhost:3001/users/${userId}/friends`,
         {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
         }
      );
      const data = await response.json()
      dispatch(setFriends({ friends: data }))
   }

   useEffect(() => {
      getFriends()
   }, [])

   return (
      <WidgetWrapper>
         <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>Friend List</Typography>
         <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends && (friends.slice(0, 5).map(friend =>
               <Friend key={friend._id} friendId={friend._id} userPicturePath={friend.picturePath} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.location} />
            ))}
            <MoreHorizOutlined sx={{ color: palette.neutral.dark }} style={{ alignSelf: "center" }} />
         </Box>
      </WidgetWrapper>
   )
}

export default FriendsListWidget