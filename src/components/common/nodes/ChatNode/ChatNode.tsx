import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

// Icons
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ChatNode = memo(({ data, isConnectable, selected, targetPosition = Position.Left, sourcePosition = Position.Right }: NodeProps) => {
	return (
		<>
			<Handle type="target" position={targetPosition} isConnectable={isConnectable} />
			<div className={`flex flex-col rounded-lg border max-w-[200px] ${selected ? 'border-primary' : ''}`}>
				<div className="bg-secondary flex justify-between items-center px-5 py-2">
					<div className="min-w-[100px]">Send Message</div>
					<div className="p-1 text-green-600 bg-white rounded-full">
						<WhatsAppIcon />
					</div>
				</div>
				<div className="px-5 py-2">{data?.message}</div>
			</div>
			<Handle type="source" position={sourcePosition} isConnectable={isConnectable} />
		</>
	);
});

export default ChatNode;
