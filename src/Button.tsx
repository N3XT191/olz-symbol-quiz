interface Props {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}
const Button = (props: React.PropsWithChildren<Props>) => (
	<button
		onClick={props.onClick}
		style={{
			appearance: "none",
			backgroundColor: props.disabled ? "#9fd2a5" : "#2e963d",
			border: "none",
			//backgroundImage: props.disabled
			//	? "none"
			//	: "linear-gradient(200deg,hsla(0,0%,100%,.15),hsla(0,0%,100%,0))",
			borderRadius: 6,
			boxShadow: props.disabled ? "none" : "rgb(27 31 35 / 10%) 0 1px 0",
			boxSizing: "border-box",
			color: props.disabled ? "#ece039" : "#fff404",
			cursor: props.disabled ? "not-allowed" : "pointer",
			display: "inline-block",
			fontSize: 14,
			fontWeight: 600,
			lineHeight: "20px",
			padding: "6px 16px",
			position: "relative",
			textAlign: "center",
			textDecoration: "none",
			userSelect: "none",
			touchAction: "manipulation",
			verticalAlign: "middle",
			whiteSpace: "nowrap",
			marginBottom: 10,
			marginRight: 5,
			marginLeft: 5,
			WebkitAppearance: "none",
			WebkitBorderRadius: 6,
		}}
		disabled={props.disabled}
	>
		{props.children}
	</button>
);

export default Button;
