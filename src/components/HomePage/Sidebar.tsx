import { Suspense, lazy } from 'react';
import { Node } from 'reactflow';
// Panel
import ChatNodePanel from '@/components/common/nodes/ChatNode/ChatPanel';

// Types
import { TNodeData } from '@/hooks/useFlow';

// Configs
const LazyChatNodeConfig = lazy(() => import('@/components/common/nodes/ChatNode/ChatNodeConfig'));

// Constants
import { ENode } from '@/utils/constant';

type TPanelMap = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: React.FC<any>;
};
const PanelMap: TPanelMap = {
	[ENode.CHAT]: LazyChatNodeConfig,
};

export type TSidebar = {
	onDragStart: (event: React.DragEvent<HTMLElement>, type: string) => void;
	selectedNode: null | Node;
	handleNodeChange: (element: Node, data: TNodeData) => void;
	goBack: () => void;
};
const Sidebar = ({ onDragStart, selectedNode, handleNodeChange, goBack }: TSidebar) => {
	const list = [ChatNodePanel];
	let Component = null;
	if (selectedNode && selectedNode.type) {
		Component = PanelMap[selectedNode.type];
		return (
			<Suspense fallback={<>Error</>}>
				<aside className="grow shrink-0 basis-[350px] border ">
					<Component element={selectedNode} handleNodeChange={handleNodeChange} goBack={goBack} />
				</aside>
			</Suspense>
		);
	}
	return (
		<>
			<aside className="grow shrink-0 basis-[350px] border p-4 grid grid-cols-2 gap-x-5 gap-y-5">
				{list.map((Component, idx) => {
					return (
						<div key={idx} className="max-h-[100px]">
							<Component onDragStart={onDragStart} />
						</div>
					);
				})}
			</aside>
		</>
	);
};

export default Sidebar;
