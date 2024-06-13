import { addView, getPost } from "@/app/lib/posts";
import Image from "next/image";

export default async function Page({ params }: { params: {slug: string}}) {

	const post = await getPost(params.slug)
	if (!post) {
		return (
			<div></div>
		)
	}

	await addView(params.slug)
	

	const {body, title, DATE, author, description, image} = post
	return (
		<div className="min-h-screen">
			<h1 className="md:text-6xl text-4xl font-bold text-center mt-4">
				{title}
			</h1>
			<h2 className="md:text-xl text-lg font-semibold text-center md:mt-5 mt-2">
				{"By: " + author}
			</h2>
			<div className="w-full justify-center flex">
				<div className="flex justify-center flex-col items-center max-w-fit">
					<p className="text-right w-full pt-3">{DATE}</p>
					<Image src={image} alt="Uploaded" className="max-w-xs pb-6 pt-3" />
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
