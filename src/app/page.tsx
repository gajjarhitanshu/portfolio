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

const linkedInUrl = "https://www.linkedin.com/in/hitanshu-gajjar/";
const githubUrl = "https://github.com/HItanshuGajjar";
const mailUrl = "mailto:" + "hitanshu.hexxum@gmail.com";
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
            {`Senior Software Engineer – React Native & Frontend`}
          </CText>

          <CText baseSize={18} className="opacity-50 mt-4 md:mt-8">
          Crafting high-performance, <br/> 
          intuitive mobile apps and website with a global mindset.
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
          {/* <Link
            href={telUrl}
            className="opacity-70 hover:opacity-100 transition-colors"
            aria-label="LinkedIn Profile"
            target="_blank"
          >
            <Phone className="w-6 h-6" />
          </Link> */}
        </div>
      </div>

      <div
        id="scrollable-div"
        className="flex flex-col md:overflow-y-auto scroll-smooth pb-20 sm:px-6 md:px-8 lg:px-16 mt-20 md:mt-0 md:flex-1"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[0] = el;
            }
          }}
          id="about"
          className="md:pt-10 lg:pt-20"
        >
          <div className="grid gap-6 md:gap-10">
            <CText baseSize={24} className="sm:text-3xl md:text-4xl">
              About
            </CText>

            <CText baseSize={14} className="opacity-80 sm:text-base md:text-lg">
              I’m Hitanshu Gajjar, a Frontend-focused Software Engineer with
              over 7 years of experience in building robust and scalable
              applications. My journey began in late 2016 as an Android
              Developer, where I spent 2.5 years honing core mobile development
              skills. This foundation eventually led me to specialize in React
              Native from mid-2019, enabling me to create high-performance,
              cross-platform mobile apps that meet modern business needs.
              <br />
              {/* <br /> */}
              Over the years, I’ve worked across a wide range of industries,
              collaborating with international clients and cross-functional
              teams including designers, testers, and developers from diverse
              backgrounds. My experience spans both full-time roles and
              contract-based projects, giving me a comprehensive understanding
              of project dynamics and stakeholder communication.
              <br />
              {/* <br /> */}
              While React Native remains my core focus, I’m also proficient in
              frontend web technologies such as React.js and Next.js, and have
              hands-on experience with backend tools including Node.js, MongoDB,
              and MySQL. In addition to my technical work, I’ve led teams and
              managed projects for over 3 years — blending coding expertise with
              leadership and strategic planning.
              <br />
              {/* <br /> */}
              My approach emphasizes performance, usability, and clean,
              maintainable code — whether I’m tackling a startup MVP or
              contributing to large-scale applications.
            </CText>
          </div>

          <div className="mt-8 md:mt-10">
            <CText baseSize={18} className="opacity-80 sm:text-xl md:text-2xl">
              Skills
            </CText>
            <div className="flex flex-wrap mt-2 gap-2">
              {skills_arr.map((item, index) => (
                <div
                  key={index}
                  className="chip bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
                >
                  <CText baseSize={10} className="sm:text-xs md:text-sm">
                    {item}
                  </CText>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[1] = el;
            }
          }}
          id="experiences"
          className="pt-20"
        >
          <div className="grid gap-6 md:gap-10">
            <CText baseSize={24} className="sm:text-3xl md:text-4xl">
              Experiences
            </CText>
            {Experience_arr?.map((item, index) => (
              <div key={index}>
                <ExperienceItemCard {...item} />
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:gap-2 mt-10">
            <CText baseSize={24} className="sm:text-3xl md:text-4xl">
              {`Contract-Based Software Development (2019-2022)`}
            </CText>

            <CText baseSize={14} className="opacity-80 sm:text-base md:text-lg">
              Between 2019 and 2022, I worked as a contract-based developer,
              delivering tailored mobile solutions to clients in varied sectors
              such as education, e-commerce, and logistics. After transitioning
              from native Android development to React Native, I focused on
              building efficient, user-friendly, and cross-platform applications
              designed to meet diverse business objectives.
              <br />
              Throughout this period, I handled full project lifecycles—taking
              ownership of projects from architectural planning and coding to
              deployment and ongoing maintenance. My technical toolkit included
              React Native, real-time databases, Firebase integration, and
              payment gateways like Razorpay and Paytm. I also connected with
              PHP-based backend services to provide end-to-end solutions for
              client requirements.
              <br />A key aspect of my contract work was the close coordination
              with international clients and distributed teams. By leveraging
              tools such as Figma, Postman, and VS Code, I ensured smooth
              workflows across development, design, and testing. Alongside
              hands-on coding, I led small teams, mentored junior developers,
              and maintained clean, structured Git workflows to keep codebases
              efficient and maintainable.
              <br />
              This experience greatly enhanced my versatility, strengthened my
              communication skills with global stakeholders, and reinforced my
              ability to independently deliver production-ready software in
              fast-paced and dynamic environments.
            </CText>
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
          <div className="grid gap-6 md:gap-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <CText baseSize={24} className="sm:text-3xl md:text-4xl">
                Projects
              </CText>
            </div>
            {Projects_arr?.map(
              (item, index) =>
                item.showAsDisplay && (
                  <div key={index}>
                    <ProjectsHomeView {...item} />
                  </div>
                )
            )}
            <Link
              href="/projects"
              className="mt-4 inline-flex items-center text-[#5eead4] hover:text-[#5eead4]/80 transition-colors group"
            >
              <span className="text-sm sm:text-base">
                View Full Project Archive
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
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
