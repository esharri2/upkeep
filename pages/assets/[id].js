import { useRouter } from "next/router";

export default function Asset() {
  const router = useRouter();
  const { id } = router.query;
  return <div>id: {id}</div>;
}
