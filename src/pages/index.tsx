import fsPromises, * as fs from "fs/promises";
import path from "path";

import { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Activity from "@/components/Activity";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Information from "@/components/Information";
import Layout from "@/components/Layout";
import Project from "@/components/Project";
import ResumeTitle from "@/components/ResumeTitle";
import WorkExperience from "@/components/WorkExperience";
import { DataProps, InformationProps, ProjectProps, WorkExperienceProps } from "@/types";
import Name from "@/components/Name";
import useScrollLock from "@/hooks/useScrollLock";
import isMobile from "@/utils/agent";

const Home: NextPage<DataProps> = ({
  resumeTitle,
  information,
  workExperience,
  project,
  activity,
  education,
}) => {
  const [openInitAnime, setOpenInitAnime] = useState(true);

  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useScrollLock({ lock: isMobile() ? false : openInitAnime });

  return (
    <>
      {/* <ScrollProgress /> */}
      <ResumeTitle resumeTitle={resumeTitle} />
      <AnimatePresence>
        {openInitAnime && (
          <motion.div
            className="hidden md:flex absolute top-0 left-0 w-[100dvw] h-[100dvh] bg-PRIMARY items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <Name
              onNameDrawEnd={() => {
                setOpenInitAnime(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Layout>
        <Information information={information} />
        <WorkExperience workExperience={workExperience} />
        <Project project={project} />
        <Activity activity={activity} />
        <Education education={education} />
        {/* <Certificate certificate={certificate} />
        <Award award={award} /> */}
      </Layout>
      <Footer contact={information.contact} name={information.name} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath, "utf8");
  const objectData = JSON.parse(jsonData);

  const informationWithData = getImgSrc({
    section: "information",
    item: await getMd({ section: "information", item: { ...objectData.information } }),
  });

  const workExperienceWithData = objectData.workExperience.map(
    async (item: WorkExperienceProps) => {
      return getImgSrc({
        section: "workExperience",
        item: await getMd({ section: "workExperience", item }),
      });
    },
  );

  const projectWithData = objectData.project.map(async (item: ProjectProps) => {
    return getImgSrc({ section: "project", item: await getMd({ section: "project", item }) });
  });

  return {
    props: {
      ...objectData,
      information: await informationWithData,
      workExperience: await Promise.all(workExperienceWithData),
      project: await Promise.all(projectWithData),
    },
  };
};

const getMd = async ({
  section,
  item,
}: {
  section: string;
  item: InformationProps | ProjectProps | WorkExperienceProps;
}) => {
  try {
    const markdownModule = await import(
      `../../public/markdown/${section}/${"id" in item ? item.id : "introduce"}.md`
    );
    return { ...item, markdown: markdownModule.default as string };
  } catch {
    // console.log("no markdown");
    return item;
  }
};

const getImgSrc = async ({
  section,
  item,
}: {
  section: string;
  item: InformationProps | ProjectProps | WorkExperienceProps;
}) => {
  const imgSrc = `/images/${section}/${"id" in item ? item.id : "profile"}.png`;
  const filePath = path.join(process.cwd(), "public", imgSrc);
  try {
    await fs.stat(filePath);
    return { ...item, imgSrc: imgSrc };
  } catch {
    // console.log("no img");
    return item;
  }
};
