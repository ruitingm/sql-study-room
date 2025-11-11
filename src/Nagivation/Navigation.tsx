import {
  ScrollText,
  MessageCircleMore,
  Settings,
  User,
  ChartColumnIncreasing,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router";
export default function NavigationBar() {
  const { pathname } = useLocation();
  const navLinks = [
    { label: "problem", path: "/main/allproblems", icon: ScrollText },
    { label: "chat", path: "/main/chat", icon: MessageCircleMore },
    { label: "report", path: "/main/report", icon: ChartColumnIncreasing },
    { label: "profile", path: "/main/profile", icon: User },
    { label: "settings", path: "/main/settings", icon: Settings },
  ];
  return (
    <aside
      id="navigation"
      className="fixed left-2 top-4 bottom-4 w-20 flex flex-col justify-between items-center rounded-xl bg-stone-200 shadow-lg"
    >
      <nav className="flex flex-col items-center space-y-8 py-8">
        {navLinks.map((link) => {
          const isActive = pathname.includes(link.label);
          return (
            <Link
              key={link.label}
              to={link.path}
              className="flex flex-col items-center justify-center rounded-sm text-stone-800"
            >
              <div>
                <link.icon
                  size={34}
                  strokeWidth={isActive ? 3 : 2}
                  className="text-stone-500 transition-all duration-200"
                />
              </div>
              <div>{link.label}</div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
