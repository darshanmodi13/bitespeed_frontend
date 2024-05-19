import { memo } from 'react';

// Icons
import ChatIcon from '@mui/icons-material/Chat';

// Constants
import { ENode } from '@/utils/constant';

// types
export type TChatNodePanel = {
	onDragStart: (event: React.DragEvent<HTMLElement>, type: string) => void;
};

const ChatNodePanel = memo(({ onDragStart }: TChatNodePanel) => {
	return (
		<>
			<div className="h-full w-full border border-primary text-primary flex flex-col justify-center items-center gap-y-5 rounded-lg" onDragStart={(event) => onDragStart(event, ENode.CHAT)}>
				<div>
					<ChatIcon fontSize="large" />
				</div>
				<div className="text-body-2">Message</div>
			</div>
		</>
	);
});

export default ChatNodePanel;
