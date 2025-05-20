import { useUserStore } from "../hooks/useUserStore";

export default function HomePage() {
  const { isAuthenticated } = useUserStore();
  console.log(isAuthenticated);

  
  return <div>HomePage</div>;
}
