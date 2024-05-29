/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, Search, Send, Sort } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import UserList from "./UserList";
import { useAppSelector } from "../../app/hooks";
import { getUserStateStatus } from "../../features/user/userSlice";
import TextMessage from "./TextMessage";
import axiosInstance from "../../utils/axiosInstance";
import Spacer from "../../components/Spacer";
import { getUserChat } from "../../features/chat/chatSlice";
import { useLottie } from "lottie-react";
import conversation from "../../assets/animation/conversation.json";

function Index() {
  // lottie
  const options = {
    animationData: conversation,
    loop: true,
  };

  const { View } = useLottie(options);

  const [inputText, setInputText] = useState("");
  const [hidePlaceholder, setHidePlaceholder] = useState(false);

  const [chatIsActive, setChatIsActive] = useState(false);
  const [chatFriend, setChatFriend] = useState<any>({});

  const [chat, setChat] = useState<any[]>([]);
  const [, setChatMetadata] = useState<any>({});

  // const chatListRef = useRef<any>();
  const spacerRef = useRef<any>();

  // let chatData: any;
  let chatItem: any[] = [];
  let userChatFriend: any = {};

  const userState: any = useAppSelector(getUserStateStatus);

  const _activeChatState = useAppSelector(getUserChat)?.data;

  let activeChatState: any;

  const inputDiv = useRef<any>();

  useEffect(() => {
    for (const a of _activeChatState) {
      if (a.active) {
        activeChatState = a;

        setChatMetadata(a);

        if (userState?.data?.id === activeChatState?.userId_0) {
          userChatFriend = activeChatState.user_1;
        }

        if (userState?.data?.id === activeChatState?.userId_1) {
          userChatFriend = activeChatState.user_0;
        }

        setChatFriend(userChatFriend);

        setChatIsActive(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        chatItem = activeChatState?.chatItem;

        const chatItemWithContinuation: any[] = [];

        if (chatItem?.length > 0) {
          for (let i = 0; i < chatItem.length; i++) {
            if (i === 0) {
              chatItemWithContinuation.push({
                ...chatItem[i],
                continue: false,
              });
            }

            if (i > 0) {
              if (chatItem[i].direction === chatItem[i - 1].direction) {
                if (chatItem[i].direction !== chatItem[i + 1]?.direction) {
                  chatItemWithContinuation.push({
                    ...chatItem[i],
                    continue: true,
                    end: true,
                    first: false,
                  });
                } else {
                  chatItemWithContinuation.push({
                    ...chatItem[i],
                    continue: true,
                    end: false,
                    first: false,
                  });
                }
              }

              if (chatItem[i].direction !== chatItem[i - 1].direction) {
                // chatItemWithContinuation.push({
                //   ...chatItem[i],
                //   continue: false,
                //   end: true,
                // });
                if (chatItem[i].direction !== chatItem[i + 1]?.direction) {
                  chatItemWithContinuation.push({
                    ...chatItem[i],
                    continue: true,
                    end: true,
                    first: false,
                  });
                } else {
                  chatItemWithContinuation.push({
                    ...chatItem[i],
                    continue: true,
                    end: false,
                    first: true,
                  });
                }
              }
            }
          }
        }

        setChat(chatItemWithContinuation);
      }
    }
  }, [_activeChatState]);

  // activeChatState?.forEach((c: any) => {
  //   chatData = c;

  //   chatItem = c.chatItem;
  //   isAppointment = c.isAppointment;

  //   if (userState.data.id === c.userId_0) {
  //     userId = c.userId_1;
  //     direction = false;
  //     userChatFriendId = c.userId_0;
  //   }

  //   if (userState.data.id === c.userId_1) {
  //     userId = c.userId_0;
  //     direction = true;
  //     userChatFriendId = c.userId_1;
  //   }
  // });

  // chatData = activeChatState;

  useEffect(() => {
    spacerRef.current?.scrollIntoView({
      behavior: "smooth",
      duration: 1000,
    });
  }, [_activeChatState]);

  return (
    <div className="p-3 min-h-full flex flex-col">
      <h2 className="text-3xl text-primary mb-6">Chat</h2>

      <div className="flex justify-between mb-10">
        <div className="flex items-center"></div>

        <div className="flex">
          <div className="flex justify-between h-10">
            <input
              type="text"
              placeholder="Search"
              className="h-full border-[1px] border-primary px-3 rounded-l"
            />
            <button className="h-10 w-10 bg-primary rounded-r">
              <Search className="text-white text-2xl" />
            </button>
          </div>

          <button className="border border-black px-4 py-1 rounded h-10 ml-4 text-primary">
            Sort by <Sort className="text-primary text-2xl ml-2" />
          </button>
        </div>
      </div>

      <div className="w-full flex-1 h-full border border-[#00000020] rounded flex">
        <UserList />
        <div className="w-full h-full relative">
          {/* {activeChatState?.user ? "Start chat now" : "Hehe"} */}

          {chatIsActive && (
            <div className="absolute flex bottom-2 bg-white shadow min-h-[2.75rem] z-10 right-6 left-4">
              <div className="w-11 min-h-[2.75rem] flex-shrink-0 flex justify-center items-center">
                <Add
                  style={{
                    fontSize: "1.4rem",
                  }}
                  className="text-primary"
                />
              </div>
              <div
                className="min-h-[2.75rem] flex-1 outline-none text-primary py-2 break-words text-lg"
                contentEditable={true}
                ref={inputDiv}
                placeholder="Type a message.."
                suppressContentEditableWarning={true}
                onClick={() => {
                  console.log("tes");
                  setHidePlaceholder(true);

                  spacerRef.current?.scrollIntoView({
                    behavior: "smooth",
                    duration: 1000,
                  });
                }}
                onKeyUp={(e) => {
                  // console.log(e.currentTarget.innerHTML)
                  setInputText(e.currentTarget.innerHTML);
                }}
                onBlur={() => {
                  if (inputText === "") {
                    setHidePlaceholder(false);
                  }
                }}
              >
                {!hidePlaceholder && inputText === "" && (
                  <p className="text-primary opacity-50 text-lg">
                    Ketik pesan disini...
                  </p>
                )}
              </div>
              <div
                className="min-h-[2.75rem] flex-shrink-0 flex justify-center items-center px-4"
                onClick={() => {
                  axiosInstance
                    .post("/api/chat", {
                      userId: chatFriend.id,
                      content: inputText,
                    })
                    .then((res) => {
                      console.log(res.data);

                      console.log(inputText);
                      setHidePlaceholder(false);
                      inputDiv.current.innerHTML = "";
                      setInputText("");
                    });
                }}
              >
                <Send
                  style={{
                    fontSize: "1.4rem",
                  }}
                  className="text-primary"
                />
              </div>
            </div>
          )}

          {chatIsActive ? (
            <>
              <div className="h-24 w-full border-b border-b-[#00000020] p-4">
                <p className="text-2xl mb-2">{chatFriend?.name}</p>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-[#00000030] rounded-full mr-3"></div>
                  <p className="text-lg">Active</p>
                </div>
              </div>

              <div className="h-[calc(100vh-24rem)] overflow-y-scroll flex-grow-1 basis-0">
                <div className="min-h-[calc(100vh-25rem)] relative">
                  <Spacer height={2} />

                  {chat?.length > 0 &&
                    chat.map((c: any) => (
                      <TextMessage
                        key={c.id}
                        text={c.content}
                        direction={c.direction ? "in" : "out"}
                        continue={c.continue}
                        time={c.time}
                        // consultantData={c.user}
                        // userData={userState?.data}
                        end={c.end}
                        first={c.first}
                      />
                    ))}

                  <div className="h-14" ref={spacerRef}></div>

                  {/* <div className="absolute bottom-2"> */}
                </div>
              </div>

              {/* </div> */}
              {/* </div> */}
            </>
          ) : (
            <div className="flex justify-center items-center h-[40rem]">
              <div className="w-1/3">{View}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
