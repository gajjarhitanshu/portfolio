"use client";

import CText from "@/components/CText/CText";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Experience_arr } from "../../public/experience";
import ExperienceItemCard from "@/components/ExperienceItemCard";
import { Projects_arr } from "../../public/projects_data";
import ProjectsHomeView from "@/components/ProjectsHomeView";
import { ArrowRight } from "lucide-react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { skills_arr } from "../../public/skills";

const linkedInUrl = "https://www.linkedin.com/in/hitanshu-gajjar-97a217180/";
const githubUrl = "https://github.com/HItanshuGajjar";
const mailUrl = "mailto:" + "gajjarh71@gmail.com";
const mailUrl2 =
  "https://mail.google.com/mail/?view=cm&fs=1&to=gajjarh71@gmail.com";
const telUrl = "tel:+917048513354";

const MenuArr = [
  {
    title: "ABOUT",
  },
  {
    title: "EXPERIENCES",
  },
  {
    title: "PROJECTS",
  },
];

export default function Home() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const [selectedMenu, setSelectedMenu] = useState("ABOUT");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log("🚀 ~ observer ~ entries:", entries);

      for (let i = 0; i < entries.length; i++) {
        const element = entries[i];
        console.log("🚀 ~ observer ~ element:", element);

        if (element.isIntersecting) {
          setSelectedMenu(element.target.id.toUpperCase());
        }
      }
      // entries.forEach((entry) => {
      //   console.log("🚀 ~ entries.forEach ~ entry.isIntersecting:", entry);
      //   if (entry.isIntersecting) {
      //     setSelectedMenu(entry.target.id.toUpperCase());
      //   }
      // });
    });

    sectionRefs.current.forEach((section: any) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section: any) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="h-lvh w-lvw flex p-10 md:p-0  flex-col md:flex-row">
      {/* Main section */}
      {/* <div className={` w-full h-[100vh] dynamic-height px-20`}>
        <span> Hitanshu Gajjar</span>

        <div>React Native Developer & Project Lead</div>
      </div> */}
      <div className="flex md:flex-1 flex-col justify-between md:my-20 md:pl-20 md:pr-10">
        <div>
          <Link href={"#about"}>
            <CText
              baseSize={40}
              fontWeight="bold"
              className={`cursor-pointer opacity-90 `}
            >
              Hitanshu Gajjar
            </CText>
          </Link>
          <CText
            baseSize={16}
            fontWeight="medium"
            className="opacity-90 mt-2 md:mt-1"
          >
            {`React Native Developer & Project Lead`}
          </CText>

          <CText baseSize={18} className="opacity-50 mt-4 md:mt-8">
            I craft seamless, intuitive, and impactful <br />
            mobile solutions with a global perspective.
          </CText>
        </div>

        <div className="w-[50%] hidden lg:block">
          <div className="flex flex-col gap-4">
            {MenuArr.map((item) => {
              let isSelected = item.title == selectedMenu;
              return (
                <React.Fragment key={item?.title}>
                  <MenuItems
                    selectedMenu={selectedMenu}
                    title={item?.title}
                    onClick={(val: string) => {
                      setSelectedMenu(val);
                    }}
                  />

                  {/* <Link
                    key={item?.title}
                    className="flex gap-4 items-center group cursor-pointer"
                    onClick={() => {
                      // onClick(title);
                      setSelectedMenu(item?.title);
                    }}
                    href={`#${item?.title.toLowerCase()}`}
                  >
                    <div
                      className={`group-hover:w-24 h-0.5 rounded-full transition-all`}
                      style={{
                        width: isSelected ? "7rem" : "1.5rem",
                        backgroundColor: isSelected ? "#E5E7EB" : "#D1D5DB",
                      }}
                    ></div>
                    <div className="hidden">
                      w-6 w-24 w-28 bg-blurGrey_50 bg-blurGrey_300
                    </div>
                    <CText
                      baseSize={12}
                      className={`text-blurGrey_300 group-hover:text-blurGrey_50 ${
                        isSelected ? "text-blurGrey_50" : ""
                      } transition-all`}
                    >
                      {item?.title}
                    </CText>
                  </Link> */}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          {/* <CText baseSize={16} fontWeight="medium" className="opacity-90">
            {`Contact Me:-`}
          </CText> */}

          <Link
            href={mailUrl}
            className="opacity-70 hover:opacity-100 transition-colors"
            aria-label="LinkedIn Profile"
            target="_blank"
          >
            <Mail className="w-6 h-6" />
          </Link>
          <Link
            href={githubUrl}
            className="opacity-70 hover:opacity-100 transition-colors"
            aria-label="GitHub Profile"
            target="_blank"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href={linkedInUrl}
            className="opacity-70 hover:opacity-100 transition-colors"
            aria-label="LinkedIn Profile"
            target="_blank"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href={telUrl}
            className="opacity-70 hover:opacity-100 transition-colors"
            aria-label="LinkedIn Profile"
            target="_blank"
          >
            <Phone className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div
        id="scrollable-div"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
        className="flex md:flex-1 mt-20 md:mt-0 flex-col overflow-scroll scroll-smooth pb-20 px-16"
      >
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[0] = el;
            }
          }}
          id="about"
          className="pt-20 "
        >
          <div className="grid gap-10">
            <CText baseSize={28}>About</CText>

            <CText baseSize={16} className="opacity-80">
              My name is Hitanshu Gajjar, and I bring 7.5 years of experience in
              the tech industry. My career began in late 2016 as an Android
              Application Developer, a role I dedicated myself to for 2.5 years.
              During this time, I developed a deep understanding of mobile app
              development, which laid the foundation for my future endeavors.
              <br />
              <br />
              In mid-2019, I transitioned to React Native, where I have since
              specialized in building cross-platform mobile applications. My
              work has spanned various industries and involved collaborating
              with overseas clients, as well as developers, designers, and
              testers from diverse backgrounds. This international experience
              has refined my ability to adapt to different project needs and
              deliver high-quality solutions.
              <br />
              <br />
              While React Native remains my primary focus, I have also explored
              other technologies, including NodeJS, ReactJS, NextJS, MongoDB,
              and MySQL. In addition to development, I managed projects for
              three years, balancing technical work with leadership
              responsibilities. This blend of hands-on development and project
              management has equipped me with a unique skill set that I bring to
              every project.
            </CText>
          </div>

          <div className="mt-10">
            <CText baseSize={20} className="opacity-80">
              Skills
            </CText>
            <div className="flex flex-row mt-2 chip-container">
              {skills_arr.map((item, index) => {
                return (
                  <div key={`${index}`} className="chip">
                    <CText baseSize={10}>{item}</CText>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* experiences section */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[1] = el;
            }
          }}
          id="experiences"
          data-value="experiences"
          className="pt-20"
        >
          <div className="grid gap-10">
            <CText baseSize={28}>Experiences</CText>
            {Experience_arr?.map((item, index) => {
              return (
                <div key={`${index}`}>
                  <ExperienceItemCard {...item} />
                </div>
              );
            })}
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[2] = el;
            }
          }}
          id="projects"
          className="pt-20"
        >
          <div className="grid gap-10">
            <div className="flex flex-row items-center justify-between">
              <CText baseSize={28}>Projects</CText>

              {/* <Link href={"/projects"}>
                <CText
                  baseSize={14}
                  className="opacity-70 ms-1 mt-1 cursor-pointer"
                >
                  Show More
                </CText>
              </Link> */}
            </div>
            {Projects_arr?.map((item, index) => {
              if (item.showAsDisplay)
                return (
                  <div key={`${index}`}>
                    <ProjectsHomeView {...item} />
                  </div>
                );
            })}
            <Link
              href="/projects"
              className="mt-1 inline-flex items-center text-[#5eead4] hover:text-[#5eead4]/80 transition-colors group"
            >
              View Full Project Archive
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
      {/* <div></div> */}
    </div>
  );
}

const MenuItems = (props: any) => {
  const { selectedMenu, id, title, onClick = () => {} } = props;
  const isSelected = selectedMenu == title;
  console.log("🚀 ~ MenuItems ~ isSelected:", isSelected, title);
  return (
    <Link
      key={title}
      className="flex gap-4 items-center group cursor-pointer"
      onClick={() => {
        onClick(title);
      }}
      href={`#${title.toLowerCase()}`}
    >
      <div
        className={`group-hover:w-24 h-0.5 rounded-full transition-all`}
        style={{
          width: isSelected ? "7rem" : "1.5rem",
          backgroundColor: isSelected ? "#E5E7EB" : "#D1D5DB",
        }}
      ></div>
      {/* Ensure these classes are generated */}
      <div className="hidden">w-6 w-24 w-28 bg-blurGrey_50 bg-blurGrey_300</div>
      <CText
        baseSize={12}
        className={`text-blurGrey_300 group-hover:text-blurGrey_50 ${
          isSelected ? "text-blurGrey_50" : ""
        } transition-all`}
      >
        {title}
      </CText>
    </Link>
  );
};
