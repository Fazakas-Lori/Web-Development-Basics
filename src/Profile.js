import { useEffect, useState } from "react";

const Profile = ({ name, size }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    });
  }, []);

  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <>
      <h2>{name}</h2>
      <img onClick={handleClick} src="https://i.imgur.com/MK3eW3Am.jpg" alt={name} width={size.width} height={size.height} />
      <p>Click count: {clickCount}</p>
    </>
  );
};

export { Profile };
