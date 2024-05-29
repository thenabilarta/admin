export function notificationTimeout() {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("from redux");
      resolve(true);
    }, 4000)
  );
}
