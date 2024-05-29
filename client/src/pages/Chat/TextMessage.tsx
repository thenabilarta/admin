/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
// import Avatar from "../../components/Avatar";

interface MsgProps {
  text: string;
  time: number;
  direction: string;
  // userData: any;
  // userData: any;
  continue: boolean;
  end: boolean;
  first: boolean;
}

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: function (_, withoutSuffix) {
      return withoutSuffix ? "now" : "30s";
    },
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mth",
    MM: "%dmth",
    y: "1y",
    yy: "%dy",
  },
});

function TextMessage(data: MsgProps) {
  if (data.direction === "in") {
    if (data.continue === false) {
      return (
        <div
          className={`w-full px-5 flex items-center mb-6 ${
            data.direction === "in" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex w-1/2">
            <div className="flex-shrink-0 items-end justify-end mr-3 w-max flex">
              <p className="text-xs text-primary">
                {moment(data.time).fromNow()}
              </p>
            </div>

            <div
              className={`w-full flex h-max flex-col shadow rounded px-5 py-2 items-start`}
            >
              <p className="text-sm">{data.text}</p>
            </div>
          </div>

          {/* <Avatar
            size={2}
            customStyle="ml-4"
            src={data?.userData?.profilePic}
          /> */}
        </div>
      );
    }

    if (data.continue === true) {
      if (data.end === true) {
        return (
          <div
            className={`w-full px-5 flex mb-6 items-center ${
              data.direction === "in" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex w-1/2">
              <div className="flex-shrink-0 items-end justify-end mr-3 w-max flex">
                <p className="text-xs text-primary">
                  {moment(data.time).fromNow()}
                </p>
              </div>

              <div
                className={`w-full flex h-max flex-col shadow rounded px-5 py-2 items-start`}
              >
                <p className="text-sm">{data.text}</p>
              </div>
            </div>

            {/* <div className="w-[3rem]"></div> */}
          </div>
        );
      }

      if (data.end === false) {
        return (
          <div
            className={`w-full px-5 flex mb-2 ${
              data.direction === "in" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex w-1/2">
              <div className="flex-shrink-0 items-end justify-end mr-3 w-max flex">
                <p className="text-xs text-white">
                  {moment(data.time).fromNow()}
                </p>
              </div>

              <div
                className={`w-full flex h-max flex-col shadow rounded px-5 py-2 items-start`}
              >
                <p className="text-sm">{data.text}</p>
              </div>
            </div>

            {/* <div className="w-[3rem]"></div> */}

            {/* {data.first ? (
              <Avatar
                size={2}
                customStyle="ml-4"
                src={data?.userData?.profilePic}
              />
            ) : (
              <div className="w-[3rem]"></div>
            )} */}
          </div>
        );
      }
    }
  }

  if (data.direction === "out") {
    if (data.continue === false) {
      return (
        <div className={`w-full px-5 flex items-center mb-2 justify-start`}>
          {/* <Avatar
            size={2}
            customStyle="mr-4"
            src={data?.userData?.profilePic}
          /> */}

          <div className="flex w-1/2">
            <div
              className={`w-full flex-1 h-max flex-col shadow rounded px-5 py-2 items-start mr-5`}
            >
              <p className="text-sm mr-3">{data.text}</p>
            </div>

            <div className="flex-shrink-0 items-end justify-end w-14 flex">
              <p className="text-xs text-primary min-w-[64px]">
                {moment(data.time).fromNow()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (data.continue === true) {
      if (data.end === true) {
        return (
          <div className={`w-full px-5 flex mb-6 items-center justify-start`}>
            {/* <div className="w-[3rem]"></div> */}

            <div className="flex w-1/2">
              <div
                className={`w-full flex-1 h-max flex-col shadow rounded px-5 py-2 items-start mr-5`}
              >
                <p className="text-sm">{data.text}</p>
              </div>

              <div className="flex-shrink-0 items-end justify-end w-14 flex">
                <p className="text-xs text-primary min-w-[64px]">
                  {moment(data.time).fromNow()}
                </p>
              </div>
            </div>
          </div>
        );
      }

      if (data.end === false) {
        return (
          <div className={`w-full px-5 flex mb-2 justify-start`}>
            {/* {data.first ? (
              <Avatar
                size={2}
                customStyle="mr-4"
                src={data?.userData?.profilePic}
              />
            ) : (
              <div className="w-[3rem]"></div>
            )} */}

            <div className="flex w-1/2">
              <div
                className={`w-full flex-1 h-max flex-col shadow rounded px-5 py-2 items-start mr-5`}
              >
                <p className="text-sm">{data.text}</p>
              </div>

              <div className="flex-shrink-0 items-end justify-end w-14 flex">
                <p className="text-xs text-primary min-w-[64px]">
                  {moment(data.time).fromNow()}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default TextMessage;
