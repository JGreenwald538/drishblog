import Link from "next/link";

interface Props {
    title: string;
	date: string;
	description: string;
}

export const PostSummary: React.FC<Props> = ({ title, date, description }) => {
    return (
			<Link href={"./posts/" + title}>
				<div className="bg-blue-500 shadow p-4 mt-5 rounded-md text-white">
					<h2 className="font-bold">{title}</h2>
					<div className="line-clamp-2 mt-2">{description}</div>
					<br />
					<p>{date}</p>
				</div>
			</Link>
		);
};