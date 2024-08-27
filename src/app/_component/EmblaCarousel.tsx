"use client";

import useEmblaCarousel from "embla-carousel-react";
import style from "./emblaCarousel.module.css";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Image from "next/image";

export default function EmblaCarousel() {
  const SLIDE_COUNT = 4;
  const options: EmblaOptionsType = { loop: true };
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 5000 }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins().autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;

    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());

    emblaApi
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return (
    <div className={style.embla}>
      <div className={cx(style.dim, style.left)}></div>
      <div className={cx(style.dim, style.right)}></div>

      <div className={style.embla__viewport} ref={emblaRef}>
        <div className={style.embla__container}>
          {slides.map((index) => (
            <div className={style.embla__slide} key={index}>
              <div className={style.embla__slide__number}>
                {/* <span>{index + 1}</span> */}
                <Image
                  className={style.embla__slide__image}
                  src={`/main/banner/banner_${index + 1}.png`}
                  width={1200}
                  height={530}
                  alt={`banner_${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={style.embla__controls}>
        <div className={style.embla__buttons}>
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button
          className={style.embla__play}
          onClick={toggleAutoplay}
          type="button"
        >
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}
