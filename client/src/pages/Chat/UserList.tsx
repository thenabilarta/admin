/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserChat } from "../../features/chat/chatSlice";
import { getUserStateStatus } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import moment from "moment";
import { setActiveChat } from "../../features/chat/chatSlice";

function UserList() {
  const chatState = useAppSelector(getUserChat);
  const userState = useAppSelector(getUserStateStatus);

  const dispatch = useAppDispatch();

  const userId = userState.data?.id;

  const chatListPublicData = [];

  if (chatState?.data?.length > 0) {
    for (const c of chatState.data) {
      if (c.userId_0 === userId) {
        chatListPublicData.push({
          // ...c.user_1,
          time:
            c?.chatItem?.length > 0
              ? c?.chatItem[c?.chatItem?.length - 1]?.time
              : null,
          content:
            c?.chatItem?.length > 0
              ? c?.chatItem[c?.chatItem?.length - 1]?.content
              : null,
          user: c.user_1,
          ...c,
        });
      }

      if (c.userId_1 === userId) {
        chatListPublicData.push({
          // ...c.user_0,
          time:
            c?.chatItem?.length > 0
              ? c?.chatItem[c?.chatItem?.length - 1]?.time
              : null,
          content:
            c?.chatItem?.length > 0
              ? c?.chatItem[c?.chatItem?.length - 1]?.content
              : null,
          user: c.user_0,
          ...c,
        });
      }
    }
  }

  return (
    <div className="w-1/4 flex overflow-y-scroll p-4 flex-col flex-shrink-0">
      {chatListPublicData.map((c: any, i: number) => (
        <div
          className="h-20 px-2 w-full border-b border-b-[#00000060] flex items-center cursor-pointer"
          key={i}
          onClick={() => {
            console.log("cc", c);
            dispatch(setActiveChat(c.id));
          }}
        >
          <div
            className="h-8 rounded-full w-8 flex-shrink-0 mr-4 bg-center bg-cover"
            style={{ backgroundImage: `url(${c?.user?.profilePic})` }}
          ></div>
          <div className="flex justify-between flex-col w-full">
            <div className="flex justify-between w-full items-center">
              <p className="line-clamp-1">{c?.user?.name}</p>
              <p className="text-xs">{c?.time && moment(c?.time).fromNow()}</p>
            </div>

            <div className="h-3"></div>

            <div className="line-clamp-1 max-w-[120px]">
              {c?.content ? c?.content : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
