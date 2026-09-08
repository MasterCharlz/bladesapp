import dynamic from "next/dynamic";

const GMView = dynamic(() => import("../../../src/gm/GMView"), {
	ssr: false,
});

export default function GMPage() {
	return <GMView />;
}
