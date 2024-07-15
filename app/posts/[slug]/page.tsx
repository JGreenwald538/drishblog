import { addView, getPost } from "../../lib/posts";
import Image from "next/image";
import "./css/embla.css"
import Gallery from "./components/Gallery";

export default async function Page({ params }: { params: {slug: string}}) {
	const slug = params.slug.replace("%20", " ")

	const post = await getPost(slug)
	if (!post) {
		return (
			<div></div>
		)
	}

	await addView(slug)

	const {body, title, DATE, author, description, images} = post
	return (
		<div className="min-h-screen">
			<h1 className="md:text-6xl text-4xl font-bold text-center mt-4">
				{title}
			</h1>
			{title != "Post Not Found" && body && author && images && <h2 className="md:text-xl text-lg font-semibold text-center md:mt-5 mt-2">
				{"By: " + author}
			</h2>}
			<div className="w-full justify-center flex">
				<div className="flex justify-center flex-col items-center max-w-fit">
					<p className="text-right w-full pt-3">{DATE}</p>
					<Gallery image={images}/>
				</div>
			</div>
			{/* <p className="pb-10 md:px-36 px-12 font-light">{description}</p> */}
			<div className="w-screen items-center justify-center align-middle flex">
				<div className="md:max-w-6xl max-w-sm">
					<div dangerouslySetInnerHTML={{ __html: body }}></div>
				</div>
			</div>
		</div>
	);
}
