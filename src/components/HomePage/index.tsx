import ReactFlow, { MarkerType, Position, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

// Components
import Header from './Header';
import Sidebar from './Sidebar';

// Hooks
import useFlow from '@/hooks/useFlow';

// Nodes
import ChatNode from '@/components/common/nodes/ChatNode/ChatNode';

// Constants
import { ENode } from '@/utils/constant';
import { useState } from 'react';

const nodeTypes = {
	[ENode.CHAT]: ChatNode,
};

const Home = () => {
	const [isError, setIsError] = useState(false);
	const { edges, nodes, selectedNodes, onConnect, onDragOver, onDrop, onEdgesChange, onNodesChange, setReactFlowInstance, onDragStart, onNodeClick, onPaneClick, handleNodeChange } = useFlow({
		nodeConfig: {
			targetPosition: Position.Left,
			sourcePosition: Position.Right,
		},
		edgeConfig: {
			markerEnd: {
				type: MarkerType.ArrowClosed,
				width: 15,
				height: 15,
				color: 'grey',
			},
			style: {
				strokeWidth: 1,
				stroke: 'grey',
			},
		},
	});

	const handleSave = () => {
		const vistedNodes = new Set();
		for (let i = 0; i < edges.length; i++) {
			vistedNodes.add(edges[i].source);
			vistedNodes.add(edges[i].target);
		}

		if (vistedNodes.size !== nodes.length) {
			setIsError(true);
			return;
		}
		setIsError(false);
		alert('Flow Save Successfully.');
	};
	return (
		<>
			<section className="h-screen flex flex-col">
				<Header save={handleSave} isError={isError} />

				<ReactFlowProvider>
					<div className="grow flex">
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							onInit={setReactFlowInstance}
							onDrop={onDrop}
							onDragOver={onDragOver}
							nodeTypes={nodeTypes}
							onNodeClick={onNodeClick}
							onPaneClick={onPaneClick}
						/>
						<Sidebar onDragStart={onDragStart} selectedNode={selectedNodes} handleNodeChange={handleNodeChange} goBack={onPaneClick} />
					</div>
				</ReactFlowProvider>
			</section>
		</>
	);
};

export default Home;
