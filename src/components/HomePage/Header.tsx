export type THeader = {
	save: () => void;
	isError: boolean;
};

const Header = ({ save, isError }: THeader) => {
	return (
		<>
			<div className="h-[7rem] bg-gray-200 flex justify-end items-center px-[10rem]">
				{isError && (
					<div className="grow shrink-0 border text-center flex justify-center h-full items-center text-white">
						<div className="bg-red-400 h-full flex justify-center items-center px-10 text-body-1">Can not Save flow</div>
					</div>
				)}
				<button className="border border-primary text-primary bg-white px-8 py-4 text-body-2 font-[500] rounded-md" onClick={save}>
					Save Changes
				</button>
			</div>
		</>
	);
};

export default Header;
