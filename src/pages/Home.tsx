import { Helmet } from 'react-helmet';

// Components
import Home from '@/components/HomePage';

const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>BiteSpeed Frontend Assignment</title>
			</Helmet>
			<Home />
		</>
	);
};

export default HomePage;
