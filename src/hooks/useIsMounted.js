import { useEffect, useState } from 'react';

function useIsMounted() {
	const [isMounted, setIsMouted] = useState(false);

	useEffect(() => {
		setIsMouted(true);
		return () => setIsMouted(false);
	}, []);

	return isMounted;
}

export default useIsMounted;
