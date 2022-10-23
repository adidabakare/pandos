import React, { useEffect, useState } from "react";

// import components
import { services } from "../data";

const Testimonials = () => {
  return (
    <>
      <section
        id="home"
        className="section bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600"
      >
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <h2 className="section-title relative font-Wavetosh before:absolute before:opacity-40 before:-top-[2rem] before:-left-28 before:hidden before:lg:block">
              You can Do more on MetaSpace{" "}
            </h2>
            <p className="subtitle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              veniam labore nisium illum cupiditate reiciendis a numquam
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const { icon, name, description } = service;
              return (
                <div
                  className="bg-secondary flex flex-col items-center justify-center p-6 rounded-2xl"
                  key={index}
                >
                  <div className="text-accent rounded-sm w-12 h-12 flex justify-center items-center mb-24 mt-10 text-[28px]">
                    {icon}
                  </div>
                  <h4 className="text-4xl font-medium mb-2">{name}</h4>
                  <p>{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
