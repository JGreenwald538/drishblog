import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocialIcon } from "react-social-icons";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
	title: "Drishti's Blog",
	description: "Blog for Drishti Dudani",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="m-0 p-0">
			<body className="flex flex-col">
				<div className="flex-1 text-gray-700 bg-blue-50">
					<Navbar />
					<main>{children}</main>
				</div>
				<footer className="w-full pt-4 bg-blue-50 text-black">
					<div>
						<div className="flex justify-center mb-2">
							<SocialIcon
								className="mx-2"
								url="https://www.linkedin.com/in/drishti-dudani-0a20a2265/"
								target="_blank"
							/>
							<SocialIcon
								className="mx-2"
								url="https://www.instagram.com/ddudani25/"
								target="_blank"
							/>
							<SocialIcon
								className="mx-2"
								url="https://www.tiktok.com/@ddudani25"
								target="_blank"
							/>
							<SocialIcon
								className="mx-2"
								url="https://snapchat.com/t/lByYj37I"
								target="_blank"
							/>
						</div>
					</div>
					<div className="text-center">
						© {new Date().getFullYear()} Drishti&apos;s Blog. All rights reserved.
					</div>
					<div className="text-center pb-4">
						Developed by{" "}
						<a
							className="text-blue-500"
							href="https://www.linkedin.com/in/jackgreenwald/"
							target="_blank"
						>
							Jack Greenwald
						</a>
					</div>
				</footer>
			</body>
		</html>
	);
}
