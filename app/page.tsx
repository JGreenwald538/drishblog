"use client";

import { useEffect, useState } from "react";
import { PostSummary } from "./components/PostSummary";
import { getPosts, Post } from "./lib/posts";
import EmblaCarousel from "./components/Gallery";
import { EmblaOptionsType } from "embla-carousel";
// import "./css/base.css";
// import "./css/sandbox.css";
import "./css/embla.css";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = await getPosts();
			setPosts(posts);
		};
		fetchPosts();
	}, []);

	const postsSorted = [...posts].sort((a, b) => {
		return new Date(b.DATE).getTime() - new Date(a.DATE).getTime();
	});
	const postsPopular = [...posts].sort((a, b) => {
		return b.views - a.views;
	});

	return (
		<div>
			<div className="bg-pink-200 w-screen min-h-screen px-0 flex md:flex-row flex-col items-center md:space-x-48 justify-around">
				<div className="md:ml-20 md:mt-0 mt-4 ml-2">
					<p className="text-3xl font-medium">
						Hi, My name is Drishti if you are reading this
					</p>
					<p className="text-3xl font-medium">Welcome to my Blog!</p>
					<p className="pt-4">Some things to know about me are...</p>
					<ul className="list-disc">
						<li className="ml-8 mt-2">I am from the Jersey area. </li>
						<li className="ml-8">
							I am majoring in Biology Pre-Med and am in the Honors Program at
							FDU.
						</li>
						<li className="ml-8">
							My birthday is in April and I am a Taurus (I think I portray the
							sign very well)
						</li>
						<li className="ml-8">
							I am 5&apos;4, which may seem short, but that means I am fun-sized.
						</li>
						<li className="ml-8">
							My absolute favorite color is blue but it switches up from time to
							time to pastel purple and pink
						</li>
						<li className="ml-8">
							My favorite number is 13 even though it is an unlucky number for
							many
						</li>
						<li className="ml-8">
							My favorite type of food is Mexican - anything from Chipotle to
							Tacobell
						</li>
						<li className="ml-8">
							My favorite desserts include cannolis, specifically the cheesecake
							caramel brownie blizzard from DQ, NY Turtle cheesecake, and
							tiramisu.
						</li>
						<li className="ml-8">
							I am a dog person so once I am older I want a Maltipoo, but other
							than that I love sea animals so Dolphins and Turtles are my
							favorite
						</li>
						<li className="ml-8">
							I have so many favorite books and can never choose but a staple
							that I will always recommend even though I read it in Middle
							School is “The Girl I Used to Be”
						</li>
						<li className="ml-8">
							Some things I like to do are... go to coffee shops, read, listen
							to music, eat out, and travel, paint, swim, and watch F1.
						</li>
					</ul>
				</div>
				<div className="md:pr-20 md:mt-0 mt-4">
					<div className="border-4 border-white rounded-xl p-4 -z-20">
						<EmblaCarousel slides={SLIDES} options={OPTIONS} />
					</div>
				</div>
			</div>
			<div className="min-h-screen">
				<div className="py-8 px-10">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:gap-14 gap-10">
						<div>
							<div className="text-center font-semibold text-2xl mb-4">
								Recent
							</div>
							{postsSorted.map((post) => (
								<PostSummary
									key={post.id}
									title={post.title}
									date={post.DATE}
									description={post.description}
								/>
							))}
						</div>
						<div>
							<div className="text-center font-semibold text-2xl mb-4">
								Popular
							</div>
							{postsPopular.map((post) => (
								<PostSummary
									key={post.id}
									title={post.title}
									date={post.DATE}
									description={post.description}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
