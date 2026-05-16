"use client";

import BadgeIcon from '@mui/icons-material/Badge';
import WindowIcon from '@mui/icons-material/Window';
import Link from 'next/link';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { fadeIn, planetVariants, slideIn, staggerContainer } from '@/utils/motion';
import { TypingText, TitleText } from '@/components/CustomTexts';
import { motion } from 'framer-motion';
import { Card } from '@/components/Card';
import Image from 'next/image';

function About() {
  

  return (
    <motion.div
    variants={staggerContainer}
    initial='hidden'
    whileInView='show'
    viewport={{once: false, amount: 0.25}}
     id='about' className='flex flex-col md:flex-row md:justify-center md:gap-x-36 items-center md:items-start pb-1 md:pb-4 about-div md:h-screen lg:h-screen relative' >
      <div className='gradient-02 z-0 overflow-hidden'/>
      <div className='[perspective:1000px] z-10'>
        <motion.div variants={fadeIn('right', 'tween', 0, 0)}  className='hidden md:hidden lg:flex p-5 img-div rounded-md z-10 [background:linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.3))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] !transition-all !duration-1000 dark:!transition-all dark:!duration-1000'
        >
            <img src="https://img.freepik.com/premium-vector/cartoon-man-is-sitting-computer-wearing-headphones_120309-124.jpg" alt="" className='rounded-md'
            />
        </motion.div>
      </div>

        <motion.div variants={fadeIn('left', 'tween', 0, 0)} className='flex z-10 flex-col items-center md:items-start gap-5 px-[40px] md:px-[0px] md:max-w-[35vw]'>
          <TypingText textStyles='text-2xl md:text-3xl pb-5 font-bold' title='About Me' />
          <div className='flex justify-around gap-7 z-10' >
            <Card
              element={<BadgeIcon className='icon text-4xl p-1 text-black dark:text-white'/>}
              name='Experience'
              title='Fresher'
            />
            <Card
              element={<WindowIcon className='icon !text-4xl p-1 text-black dark:text-white'/>}
              name='Projects'
              title='10+ Projects'
            />
          </div>
          <p className='text-[14px] text-center md:text-start overflow-hidden text-black dark:text-white font-light tracking-normal'>Started Web Development a year ago. Have been constantly gaining knowledge. Trying to be better everyday. <br/> <br/> Hi, I am Sheik Gulfaan from Chennai, India. I&apos;m a fresh-faced Frontend Developer who enjoys making websites look awesome and easy to use. I&apos;m currently diving into the world of backend development too, to understand what happens behind the scenes. Learning is my superpower, and I&apos;m always excited to explore new ideas and bring them to life. My goal is to create websites that people love to visit and use. Let&apos;s embark on this coding adventure together and craft some digital magic! <br/><br/>!Check Out my Resume Below.</p>
          <motion.div  className='pb-16'>
            <Link href='#' className='relative px-5 py-3 text-sm md:text-xl flex items-center text-black dark:text-white !rounded-full !shadow-lg hover:!shadow-md glass [background:linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.3))] hover:[background:linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.5))] dark:[background:linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] dark:hover:[background:linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.2))] focus:[background:linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,0.8))] dark:focus:[background:linear-gradient(135deg,rgba(255,255,255,0.8),rgba(255,255,255,0.5))] !transition-all !duration-1000 dark:!transition-all dark:!duration-1000 gap-3 font-medium social-link-3 dark:social-link-3'>Download Resume <DownloadRoundedIcon /></Link>
          </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About;