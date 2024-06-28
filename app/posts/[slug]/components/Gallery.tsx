"use client"

import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { ReactNode } from "react";


type PropType = {
	image: string;
	options?: EmblaOptionsType;
};




const EmblaCarousel: React.FC<PropType> = (props) => {
	const {image, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi);

	console.log(image);

	if (!image) {
		return <div></div>;
	}
	let images = JSON.parse(image);
	images = images.filter((img: string) => {
		return img !== ""
	});
	console.log(images);
	images = images.map((img: string, index: number) => (
		<Image
			src={img}
			alt={index.toString()}
			width={500}
			height={500}
			key={index}
		/>
	));
	


	return (
		<section className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{images.map((image: ReactNode, index: number) => (
						<div
							className="embla__slide flex items-center justify-center"
							key={index}
						>
							{image}
						</div>
					))}
				</div>
			</div>

			{images.length > 1 && <div className="flex justify-center">
				<div className="embla__controls">
					<div className="embla__dots">
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								onClick={() => onDotButtonClick(index)}
								className={"embla__dot".concat(
									index === selectedIndex ? " embla__dot--selected" : ""
								)}
							/>
						))}
					</div>
				</div>
			</div>}
		</section>
	);
};

export default EmblaCarousel;
