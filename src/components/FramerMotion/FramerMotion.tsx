import { motion } from "framer-motion";

const animations = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export default function FrammerMotion({ children }: any) {
	return (
		<motion.div
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.7 }}
		>
			{children}
		</motion.div>
	);
}
