import React from "react";

// import img
import Image from "../assets/img/about.webp";

const About = () => {
  return (
    <section className="section bg-secondary" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-24">
          <img
            className="object-cover h-full w-[566px] md:mx-auto lg:mx-0 rounded-2xl"
            src={Image}
            alt=""
          />
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col">
              <h2 className="text-3xl lg:text-4xl font-medium lg:font-extrabold mb-3 before:content-about relative before:absolute before:opacity-40 before:-top-[2rem] before:hidden before:lg:block">
                world3
              </h2>
              <p className="mb-4 text-accent">What is World3?</p>
              <hr className="mb-8 opacity-5" />
              <p className="mb-8">
                World 3 is the first web3 platform that helps raise fund in
                crypto for adventurers to tackle the SDG goals. It provides
                complete transparency and accountability, allowing investors to
                track their return on investment easily through our transparent
                system.
              </p>
            </div>
            {/* <button className="btn btn-md bg-accent hover:bg-secondary-hover transition-all">
              Contact me
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
