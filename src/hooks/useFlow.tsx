import { useState, useCallback } from 'react';
import { Node, useNodesState, useEdgesState, ReactFlowInstance, Edge, Connection, addEdge } from 'reactflow';

// React Flow Configuration
let id = 0;
const getId = () => `node_${id++}`;

export type TUseFlowProps = {
	nodeConfig?: Partial<Node>;
	edgeConfig?: Partial<Edge>;
};

export type TNodeData = Pick<Node, 'data'> & { message?: string };

const useFlow = ({ edgeConfig, nodeConfig }: TUseFlowProps) => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
	const [selectedNodes, setSelectedNodes] = useState<Node | null>(null);

	const onConnect = useCallback(
		(params: Edge | Connection) => {
			setEdges((els) => {
				if (edgeConfig) {
					Object.assign(params, edgeConfig);
				}
				return addEdge(params, els);
			});
		},
		[edgeConfig, setEdges]
	);

	const onDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLElement>) => {
			event.preventDefault();
			const type = event.dataTransfer.getData('application/reactflow');

			// check if the dropped element is valid
			if (typeof type === 'undefined' || !type) {
				return;
			}

			if (!reactFlowInstance) return;
			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: getId(),
				type,
				position,
				data: { message: '' },
			};

			if (nodeConfig) {
				Object.assign(newNode, nodeConfig);
			}

			setNodes((nds) => nds.concat(newNode));
		},
		[nodeConfig, reactFlowInstance, setNodes]
	);

	const onDragStart = (event: React.DragEvent<HTMLElement>, nodeType: string) => {
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	const onNodeClick = (_: React.MouseEvent<Element>, element: Node) => {
		setSelectedNodes(element);
	};

	const onPaneClick = () => {
		setSelectedNodes(null);
	};

	const handleNodeChange = (element: Node, data: TNodeData) => {
		setNodes((prevNodes) => {
			return prevNodes.map((node) => {
				if (node.id == element.id) {
					return { ...node, data: { ...data } };
				}
				return node;
			});
		});
	};

	return { nodes, edges, selectedNodes, onPaneClick, onConnect, onDragOver, onDrop, onNodesChange, onEdgesChange, onNodeClick, setReactFlowInstance, onDragStart, setNodes, handleNodeChange };
};

export default useFlow;
