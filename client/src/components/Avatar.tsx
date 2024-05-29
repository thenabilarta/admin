function Avatar({
  size,
  src,
  customStyle,
}: {
  size: number;
  src?: string;
  customStyle?: string;
}) {
  return (
    <div
      className={`bg-center bg-cover bg-no-repeat rounded-full ${customStyle}`}
      style={{
        backgroundImage: `url(${
          src || "https://ui-avatars.com/api/?name=Mr."
        })`,
        height: `${size}rem`,
        width: `${size}rem`,
      }}
    ></div>
  );
}

export default Avatar;
