import dynamic from "next/dynamic";

const ProfileSelection = dynamic(() => import("../src/ProfileSelection"), {
	ssr: false,
});

export default function HomePage() {
	return <ProfileSelection />;
}
