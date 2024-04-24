
// eslint-disable-next-line react/prop-types
function Credit({ toggle }) {
  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-glass backdrop-blur-[10px] z-50"
      onClick={() => toggle(false)}
    >
      <div className="md:w-[400px] md:h-[400px] text-white text-xs w-[300px] h-[300px] flex items-center justify-centers">
        <div className="text-center w-full h-full rounded-[50%] bg-transparent  flex items-center flex-col justify-center px-12">
          <p className="font-bold">Audio Credits</p>
          <img
            src="src/public/hsbclogo.svg"
            alt="logo of hsbc"
            className="m-4 mx-auto bg-white p-2"
            width={100}
            height={100}
          />
          <p className="font-bold">Live ATC: liveatc.net</p>

          <p className="mt-8 font-[500]">Designed & Built By MW</p>

          <p
            onClick={() => toggle(false)}
            className="font-bold text-2xl text-grey hover:text-white cursor-pointer mt-4"
          >
            &times;
          </p>
        </div>
      </div>
    </div>
  );
}

export default Credit;