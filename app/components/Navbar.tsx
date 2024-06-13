import Link from "next/link"

export const Navbar: React.FC = () => {
    return (
			<nav className="bg-blue-300 sticky top-0 z-50">
				<div className="container mx-auto flex md:justify-between p-4 justify-center">
					<Link
						className="text-2xl font-bold bg-blue-50 px-3 rounded-xl"
						href="/"
					>
						Drishti's Blog
					</Link>
				</div>
			</nav>
		);
};