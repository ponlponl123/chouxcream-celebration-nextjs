"use client";
import React, { useEffect, useRef } from "react";
import { TConductorInstance } from "react-canvas-confetti/dist/types/index";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { AnimatePresence, motion } from "framer-motion";
import { GitMergeIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";
import { Button } from "@heroui/button";

function Page() {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controller = useRef<TConductorInstance | null>(null);
  const [contentIsReady, setContentIsReady] = React.useState(false);

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    controller.current = conductor;
    if (!controller.current) return;

    controller.current.run({ speed: 3, duration: 3000, delay: 5000 });
  };

  useEffect(() => {
    const introVideo = introVideoRef.current;
    const video = videoRef.current;
    if (!introVideo || !video) return;
    let tl = gsap.timeline();
    tl.to("body", { overflow: "hidden", duration: 0 });
    introVideo.play().catch((error) => {
      console.error("Error playing intro video:", error);
    });

    const handleIntroEnded = () => {
      introVideo.classList.add("hidden");
      video.classList.remove("hidden");
      setTimeout(() => {
        tl.to("body", { overflow: "auto", duration: 0 });
        setContentIsReady(true);
      }, 2400);
      video.play().catch((error) => {
        console.error("Error playing main video:", error);
      });
    };
    introVideo.addEventListener("ended", handleIntroEnded);

    return () => {
      introVideo.removeEventListener("ended", handleIntroEnded);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div
        key="video-container"
        className="absolute w-full h-screen z-0 pointer-events-none"
      >
        <video
          ref={introVideoRef}
          key="background-video-intro"
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://static.ponlponl123.com/h.264/chouxproject/Comp%203.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <video
          ref={videoRef}
          key="background-video"
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden"
        >
          <source
            src="https://static.ponlponl123.com/h.264/chouxproject/Comp%202.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.64, delay: 5 }}
        key="main"
        className="flex flex-col gap-6 items-center justify-center min-h-screen h-full w-full z-10 bg-linear-to-t from-black to-transparent"
      >
        <Fireworks key="fireworks" onInit={onInitHandler} />
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.64, delay: 5 }}
          className="text-2xl font-semibold"
        >
          🎂 Happy birthday 🎉
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.64, delay: 5.16 }}
          className="text-8xl text-center"
        >
          シュークリーム
        </motion.h2>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.64, delay: 5.32 }}
        >
          2 Year's Anniversary
        </motion.span>
      </motion.main>
      {contentIsReady && (
        <>
          <section
            key="section-tanabata-event"
            className="h-max flex max-md:flex-col md:justify-center max-md:items-center w-full z-10 py-12 md:py-24 px-4 gap-6 bg-black"
          >
            <div className="flex flex-col gap-6 max-w-lg w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-white drop-shadow-md"
              >
                🎋 วันทานาบาตะ
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-lg drop-shadow-sm"
              >
                ในวันทานาบาตะปีนี้ シュークリーム ได้จัดกิจกรรมพิเศษ
                เชิญชวนก้อนมีมี่ ร่วมเขียนคำอธิษฐานและแขวนไว้บนต้นไผ่ (สมุด)
                เพื่อเป็นการขอพรในวันทานาบาตะ
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-lg drop-shadow-sm"
              >
                คำอธิษฐานที่เหล่าก้อนมีมี่ ได้เขียนไว้นั้น
                ล้วนเต็มไปด้วยความปรารถนาดี ความสุข และความหวังดีต่อตนเอง และ
                シュークリーム ทั้งสิ้น 💖
              </motion.p>
              <motion.span>7 กรกฎาคม 2025</motion.span>
            </div>
            <div className="mt-8 md:mt-12 w-full max-w-md flex justify-center">
              <img
                src="/memory/1IMG_6915.jpg"
                alt="Tanabata Wishes"
                className="w-full h-max object-cover rounded-sm shadow-lg"
              />
            </div>
          </section>
          <section
            key="section-goods-event"
            className="h-max flex max-md:flex-col md:justify-center max-md:items-center w-full z-10 py-12 md:py-24 px-4 gap-6 bg-black"
          >
            <div className="mt-8 md:mt-12 w-full max-w-md flex justify-center">
              <img
                src="/memory/Choux_Goods_1.png"
                alt="Tanabata Wishes"
                className="w-full h-max object-cover rounded-sm shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-6 max-w-lg w-full text-end">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-white drop-shadow-md"
              >
                ✨ ของที่ระลึกสุดพิเศษ
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-lg drop-shadow-sm"
              >
                ในโอกาสกลับมาไทย1 อาทิตย์ シュークリーム
                ได้จัดทำของที่ระลึกสุดพิเศษ เพื่อเป็นการขอบคุณก้อนมีมี่ ชาวไทย
                ที่คอยสนับสนุนและติดตามมาโดยตลอด
              </motion.p>
              <ul>
                <li>🥯สแตนดี้</li>
                <li>🥯พวงกุญแจ</li>
                <li>🌿ยาดมสมุนไพรแฮนเมด ซู้ดวันนี้ตื่นถึงอาทิตย์หน้า</li>
                <li>🥯เซ็ตสติ๊กเกอร์ไดคัท</li>
                <li>🥯ตั๋วฟิล์มสุดจ๊าบ พร้อมลายเซ็น</li>
                <li>🥯โฟโต้การ์ด</li>
              </ul>
              <motion.span>23 สิงหาคม 2025</motion.span>
            </div>
          </section>
          <section
            key="section-something-special"
            className="min-h-screen h-full flex flex-col items-center w-full z-10 py-12 px-4 bg-black"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-white drop-shadow-md"
            >
              🧩 เหตุการณ์ในปีนี้
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
              {[
                {
                  name: "ไลฟ์ทำงาน",
                  img: "/memory/2working.png",
                  rotate: -2,
                },
                {
                  name: "ย่างสเต๊กเนื้อจากคุมาโมโตะ",
                  img: "/memory/3steak.png",
                  rotate: 3,
                },
                {
                  name: "🌸ซากุระมัตสึริ",
                  img: "/memory/4sakura.png",
                  rotate: -4,
                },
                {
                  name: "ออกกำลัง ชึบชึบ",
                  img: "/memory/5ringfit.png",
                  rotate: 1,
                },
                {
                  name: "ประกาศสำคัญ",
                  img: "/memory/6important-announcement.png",
                  rotate: -3,
                },
                {
                  name: "กินผักประทังชีวิต 🥺",
                  img: "/memory/7veg4life.png",
                  rotate: 2,
                },
                {
                  name: "อยากเล่น Osu!",
                  img: "/memory/8project-sekai.png",
                  rotate: -1,
                },
                {
                  name: "นอน",
                  img: "/memory/9slep.png",
                  rotate: 4,
                },
                {
                  name: "กลับไทย 10 วัน",
                  img: "/memory/10backtoth.png",
                  rotate: -2,
                },
                {
                  name: "ได้เล่น Osu!",
                  img: "/memory/11playosu.png",
                  rotate: 3,
                },
                {
                  name: "🥚ไข่แตก!",
                  img: "/memory/12playingegg.png",
                  rotate: -3,
                },
                {
                  name: "หูแตก",
                  img: "/memory/13breakingears.png",
                  rotate: 1,
                },
                {
                  name: "วาดรูป",
                  img: "/memory/14drawing.png",
                  rotate: -4,
                },
                {
                  name: "แนะนำคนที่อยากอยู่ญี่ปุ่น",
                  img: "/memory/15travel-japan.png",
                  rotate: 2,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    key={index}
                    initial={{ scale: 1, rotate: item.rotate }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-white p-3 rounded-sm shadow-lg transform transition-transform cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-200 rounded-sm mb-2 overflow-hidden relative flex items-center justify-center">
                      <span className="text-4xl">🖼️</span>
                      {item.img && (
                        <img
                          src={item.img}
                          alt={item.name || `Photo ${index}`}
                          className="w-full h-full object-cover absolute top-0 left-0"
                        />
                      )}
                    </div>
                    <p className="text-black text-center font-medium text-sm">
                      {item.name || `Photo ${index}`}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>
          <section
            key="section-thankyou-card"
            className="h-max flex flex-col items-center w-full z-10 py-12"
          >
            <motion.div className="mailcard relative max-w-2xl p-3 sm:p-6 w-[calc(100%-6rem)] h-max">
              <HeartIcon
                className="absolute text-amber-500 -top-4 -right-4 rotate-12 sm:scale-150"
                size={64}
                weight="fill"
              />
              <div className="w-full h-full bg-white/90 text-black text-center px-4 py-6 sm:px-12 rounded-sm">
                <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
                <p className="text-base">
                  ขอบคุณสำหรับรอยยิ้มและเสียงหัวเราะที่มอบให้พวกเราเสมอมา
                  ดีใจที่ได้ติดตามและเป็นกำลังใจให้ ขอให้มีความสุขมากๆ
                  และผลิตผลงานดีๆ ออกมาให้พวกเราได้รับชมกันอีกเรื่อยๆ น้าา
                  <br />
                  <br />
                  รักและติดตามเสมอ
                  <br />
                  <a
                    href="https://www.youtube.com/@ChouxCreamii"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-600 font-semibold hover:underline"
                  >
                    ChouxCreamii
                  </a>
                </p>
              </div>
            </motion.div>
          </section>
          <section
            key="section-forcontributions"
            className="h-max flex flex-col items-center w-full z-10 py-12"
          >
            <GitMergeIcon size={32} weight="fill" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold mb-6 mt-4"
            >
              มีส่วนร่วมในการสร้าง ChouxCream Celebration ในปีหน้า!
            </motion.h2>
            <Button
              as="a"
              href="https://github.com/ponlponl123/chouxcream-celebration-nextjs"
              size="sm"
              color="warning"
              className="-mt-2"
              target="_blank"
              rel="noreferrer"
            >
              Fork now!
            </Button>
          </section>
        </>
      )}
    </AnimatePresence>
  );
}

export default Page;
