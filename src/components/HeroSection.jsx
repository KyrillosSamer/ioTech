export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[600px] md:h-[650px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/Imgs/cover.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4B2615AD] to-[#4B261547]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-white max-w-5xl px-4 md:px-0">
        
        {/* Text */}
        <div className="w-full md:w-[700px] text-center md:text-left mt-10 md:mt-25">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Lorem ipsum</h1>
          <p className="text-base sm:text-lg md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Praesentium doloribus quasi odit sequi sunt omnis dolores, tempora quidem dolorem.
          </p>
        </div>

        {/* Photo */}
        <div className="w-[275px] sm:w-[300px] md:w-[374px] h-[275px] sm:h-[350px] md:h-[374px]">
          <img 
            src="/Imgs/person.png" 
            alt="Small side" 
            className="w-full h-full object-cover rounded-xl shadow-lg bg-[#643F2E]"
          />
        </div>

      </div>
    </section>
  );
}
