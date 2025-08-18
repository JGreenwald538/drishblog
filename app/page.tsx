// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { PostSummary } from "./components/PostSummary";
import EmblaCarousel from "./components/Gallery";
import { EmblaOptionsType } from "embla-carousel";
import "./css/embla.css";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

// Define the Post interface here or import from a shared types file
interface Post {
	id: number;
	title: string;
	DATE: string;
	body: string;
	description: string;
	author: string;
	views: number;
	images: string;
	published: number;
}

export default function Home() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				console.log("Fetching posts from API...");
				const response = await fetch("/api/posts");

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.details || "Failed to fetch posts");
				}

				const data = await response.json();
				console.log(`Received ${data.length} posts`);
				setPosts(data);
			} catch (error: any) {
				console.error("Failed to fetch posts:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	const postsSorted = [...posts].sort((a, b) => {
		return new Date(b.DATE).getTime() - new Date(a.DATE).getTime();
	});

	const postsPopular = [...posts].sort((a, b) => {
		return b.views - a.views;
	});

	// Show loading state
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-2xl">Loading posts...</div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-red-500">
					<p className="text-2xl mb-2">Failed to load posts</p>
					<p className="text-sm">{error}</p>
				</div>
			</div>
		);
	}

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
							I am 5&apos;4, which may seem short, but that means I am
							fun-sized.
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
							School is "The Girl I Used to Be"
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
							{posts.length === 0 ? (
								<p className="text-center text-gray-500">No posts yet</p>
							) : (
								postsSorted.map((post) => (
									<PostSummary
										key={post.id}
										title={post.title}
										date={post.DATE}
										description={post.description}
									/>
								))
							)}
						</div>
						<div>
							<div className="text-center font-semibold text-2xl mb-4">
								Popular
							</div>
							{posts.length === 0 ? (
								<p className="text-center text-gray-500">No posts yet</p>
							) : (
								postsPopular.map((post) => (
									<PostSummary
										key={post.id}
										title={post.title}
										date={post.DATE}
										description={post.description}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
