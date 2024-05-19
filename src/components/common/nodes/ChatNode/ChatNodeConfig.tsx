import { memo, useState } from 'react';
import { Node } from 'reactflow';
// Types
import { TNodeData } from '@/hooks/useFlow';

// Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export type TChatNodeConfig = {
	element: Node;
	handleNodeChange: (element: Node, data: TNodeData) => void;
	goBack: () => void;
};

const ChatNodeConfig = memo(({ element, handleNodeChange, goBack }: TChatNodeConfig) => {
	const [data, setData] = useState<TNodeData>(element.data);
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setData((data) => {
			return {
				...data,
				[event.target.name]: event.target.value,
			};
		});
		handleNodeChange(element, { ...data, [event.target.name]: event.target.value });
	};
	return (
		<>
			<div className="px-5 py-2 flex items-center h-[30px] border w-full">
				<div className="basis-[30px] cursor-pointer" onClick={goBack}>
					<KeyboardBackspaceIcon />
				</div>
				<div className="grow shrink-0 text-center">Message</div>
			</div>
			<div className="flex flex-col px-5 py-3 gap-y-5">
				<label>Message</label>
				<textarea name="message" className="border px-4 py-2 h-[70px]" value={data?.message || ''} onChange={handleChange} />
			</div>
		</>
	);
});

export default ChatNodeConfig;
