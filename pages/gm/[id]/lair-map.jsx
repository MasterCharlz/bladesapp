import dynamic from "next/dynamic";

const LairMap = dynamic(() => import("../../../src/gm/LairMap"), {
	ssr: false,
});

export default function LairMapPage() {
	return <LairMap />;
}
