import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const skills = [
  {
    id: 1,
    image: "basketball.jpg",

  },
  {
    id: 2,
    image: "code.jpg",
 
  },
  {
    id: 3,
    image: "draw.jpg",

  },
  {
    id: 4,
    image: "gaming.jpg",

  },
  {
    id: 5,
    image: "mold.jpg",
  }
];

const SkillSlider = () => {
  // Create a longer array of slides for smoother animation
  const extendedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <section className="absolute top-180 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen py-12 bg-transparent z-20">
      <div className="w-full px-4">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 15,
            stretch: 50,
            depth: 200,
            modifier: 1,
            slideShadows: true
          }}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          speed={8000}
          allowTouchMove={false}
          preventClicks={true}
          noSwiping={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="flex items-center justify-center skill-slider w-full pointer-events-none"
        >
          {extendedSkills.map((skill, index) => (
            <SwiperSlide key={`${skill.id}-${index}`} className="flex items-center justify-center w-full">
              <div className="rounded-xl z-[21] shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 w-full">
                <div className="p-4">
                  <div className="h-100 w-105 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={skill.image} 
                      alt="skill"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SkillSlider;