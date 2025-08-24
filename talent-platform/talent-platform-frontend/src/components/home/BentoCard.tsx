import React from 'react';

type Props = {
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
};

const BentoCard: React.FC<Props> = ({ title, subtitle, children, footer, className }) => {
	return (
		<div
			className={[
				'group relative rounded-3xl border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
				'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300',
				'p-6 md:p-7 overflow-hidden',
				className ?? '',
			].join(' ')}
		>
			{/* subtle dot grid */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage:
						'radial-gradient(circle at 1px 1px, #000 1px, transparent 0), radial-gradient(circle at 25px 25px, #000 1px, transparent 0)',
					backgroundSize: '28px 28px',
				}}
			/>
			{(title || subtitle) && (
				<div className="relative z-[1] mb-3">
					{subtitle && (
						<div className="text-xs font-medium tracking-wide text-gray-500 uppercase">{subtitle}</div>
					)}
					{title && (
						<h3 className="mt-1 text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
					)}
				</div>
			)}
			<div className="relative z-[1]">{children}</div>
			{footer && <div className="relative z-[1] mt-4 text-sm text-gray-600">{footer}</div>}
		</div>
	);
};

export default BentoCard;
