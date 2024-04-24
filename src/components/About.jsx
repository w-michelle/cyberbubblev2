function About({ toggle }) {
    return (
      <div
        className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-glass backdrop-blur-[10px] z-50"
        onClick={() => toggle(false)}
      >
        <div className="md:w-[400px] md:h-[400px] text-white text-xs w-[330px] h-[330px] flex items-center justify-centers">
          <div className="text-center w-full h-full rounded-[50%] bg-transparent border-2 border-greyBlue flex items-center flex-col justify-center px-12">
            <h3 className="font-bold mb-4">Cyber Bubble</h3>
  
            <p>
              is a web app designed to create a personal space for your ideas and
              thoughts. It was inspired by the pandemic and the longing for
              travel, as many people miss the familiar sounds of home. The
              app&apos;s audio is meant to provide comfort and a sense of
              familiarity to those who are studying, working, or just going about
              their daily lives.
            </p>
            <p
              onClick={() => toggle(false)}
              className="font-bold text-2xl text-grey cursor-pointer mt-4 hover:text-white"
            >
              &times;
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default About;
  