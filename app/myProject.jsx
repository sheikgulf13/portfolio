"use client";

import { motion } from 'framer-motion'
import { TypingText } from '@/components/CustomTexts';
import { fadeIn, staggerContainer } from '@/utils/motion';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/utils/data';
import { useState } from 'react';

function MyProject() {
  const [active, setActive] = useState('all')
  return (
    <motion.div variants={staggerContainer}
    initial='hidden'
    whileInView='show'
    viewport={{once: false, amount: 0}} id='projects' className='w-full flex flex-col text-black dark:text-white justify-center items-center py-10 pb-24 relative'>
        <div className='absolute gradient-04 z-0 overflow-hidden'/>
        <TypingText textStyles='text-2xl md:text-3xl font-bold my-5 z-10' title='My Projects' />

        <motion.div variants={fadeIn('right', 'spring', 0.2, 0)} className='flex flex-col md:gap-10 z-10 items-center !transition-all !duration-1000 dark:!transition-all dark:!duration-1000'>
          <div className='flex gap-5 md:gap-10 project-cat scroll-smooth py-5 items-center md:justify-center font-semibold'>
            <button
              className={`text-black dark:text-white px-5 py-2 !rounded-full !shadow-lg hover:!shadow-md glass [background:linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.3))] hover:[background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.5))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] dark:hover:[background:linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.2))] !transition-all !duration-1000 dark:!transition-all dark:!duration-1000 ${active === 'all' && '[background:linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.8),rgba(255,255,255,0.5))] dark:!text-black'}`}
              onClick={() => setActive('all')}
            > 
              All
            </button>
            <button 
              className={`text-black dark:text-white px-5 py-2 !rounded-full !shadow-lg hover:!shadow-md glass [background:linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.3))] hover:[background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.5))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] dark:hover:[background:linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.2))] !transition-all !duration-1000 dark:!transition-all dark:!duration-1000  ${active === 'Fullstack' && '[background:linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.8),rgba(255,255,255,0.5))] dark:focus:!text-black'}`}
              onClick={() => setActive('Fullstack')}>
                FullStack
            </button>
            <button 
              className={`text-black dark:text-white px-5 py-2 !rounded-full !shadow-lg hover:!shadow-md glass [background:linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.3))] hover:[background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.5))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] dark:hover:[background:linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.2))] !transition-all !duration-1000 dark:!transition-all dark:!duration-1000 dark:focus:!text-black ${active === 'Frontend' && '[background:linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.8),rgba(255,255,255,0.5))] dark:focus:!text-black'}`}
              onClick={() => setActive('Frontend')}>
                Frontend
            </button>
            <button 
              className={`text-black dark:text-white px-5 py-2 !rounded-full !shadow-lg hover:!shadow-md glass [background:linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.3))] hover:[background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.5))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] dark:hover:[background:linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.2))] !transition-all !duration-1000 dark:!transition-all dark:!duration-1000  ${active === 'Backend' && '[background:linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.8),rgba(255,255,255,0.5))] dark:focus:!text-black'}`}
              onClick={() => setActive('Backend')}>
                Backend
            </button>
          </div>

          <motion.div layout className='project-cat md:w-[70vw] flex flex-nowrap md:flex-wrap gap-5 md:gap-16 m-5 items-center md:justify-center'>
            {active === 'all' ? projects?.map((project, index) => {
              return (
                <ProjectCard
                  key={index}
                  imgUrl={project.image}
                  title={project.name}
                  desc={project.description}
                  liveSite={project.url}
                  github={project.github}
                />
              )
            }) : active === 'Fullstack' ? projects?.map((project, index) => {
              if(project.id === 'Fullstack') {
                return (
                  <ProjectCard
                    key={index}
                    imgUrl={project.image}
                    title={project.name}
                    desc={project.description}
                    liveSite={project.url}
                    github={project.github}
                  />
                )
              }
            }) : active === 'Frontend' ? projects?.map((project, index) => {
              if(project.id === 'Frontend') {
                return (
                  <ProjectCard
                    key={index}
                    imgUrl={project.image}
                    title={project.name}
                    desc={project.description}
                    liveSite={project.url} 
                    github={project.github}
                  />
                )
              }
            }) : active === 'Backend' && projects?.map((project, index) => {
              if(project.id === 'Backend') {
                return (
                  <ProjectCard
                    key={index}
                    imgUrl={project.image}
                    title={project.name}
                    desc={project.description}
                    liveSite={project.url} 
                    github={project.github}
                  />
                )
              }
            })}
           
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default MyProject;