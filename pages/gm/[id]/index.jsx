import dynamic from "next/dynamic";

const GMView = dynamic(() => import("../../../src/GMView"), {
	ssr: false,
});

export default function GMPage() {
	return <GMView />;
}
