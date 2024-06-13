import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
};

const images = [
	<Image src="/Images/Image1.jpg" alt="1" width={500} height={500} key = {1}/>,
	<Image
		src="/Images/Image2.jpg"
		alt="2"
		width={500}
		height={500}
		className="max-h-1/2"
		key = {2}
	/>,
	<Image
		src="/Images/Image3.jpg"
		alt="3"
		width={500}
		height={500}
		className="h-fit"
		key = {3}
	/>,
	<Image src="/Images/Image4.jpg" alt="4" width={500} height={500} key = {4} />,
	<Image src="/Images/Image5.jpg" alt="5" width={500} height={500} key = {5} />,
	<Image src="/Images/Image6.jpg" alt="6" width={500} height={500} key = {6} />,
	<Image
		src="/Images/Image7.jpg"
		alt="7"
		width={500}
		height={500}
		className="h-fit"
		key = {7}
	/>,
	<Image src="/Images/Image8.jpg" alt="8" width={500} height={500} key = {8} />,
];

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);


	return (
		<section className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{images.map((image, index) => (
						<div
							className="embla__slide flex items-center justify-center"
							key={index}
						>
							{image}
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-center">
				<div className="embla__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</section>
	);
};

export default EmblaCarousel;
