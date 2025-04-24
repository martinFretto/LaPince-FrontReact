type FlagProps = {
	color: string | null;
	text: string | null;
};

export default function Flag({ color, text }: FlagProps) {
	return (
		<>
			<div
				className={`absolute ${color} border-1 border-black flex justify-center items-center w-55 h-10 rotate-315 z-20 -left-13 top-10`}
			>
				<p className="font-semibold text-md">{text}</p>
			</div>
		</>
	);
}
