import type { SVGProps } from "react";
import type { ServiceSlug } from "@/lib/services";

type IconProps = SVGProps<SVGSVGElement>;

const shared: IconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ICONS: Record<ServiceSlug, (props: IconProps) => React.ReactElement> = {
  "ai-ml": (props) => (
    <svg {...shared} {...props} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  ),
  "app-development": (props) => (
    <svg {...shared} {...props} aria-hidden>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  "web-development": (props) => (
    <svg {...shared} {...props} aria-hidden>
      <rect x="2.5" y="4" width="19" height="15" rx="2" />
      <path d="M2.5 9h19M7 14l2 2-2 2M13 18h4" />
    </svg>
  ),
  "ai-automations": (props) => (
    <svg {...shared} {...props} aria-hidden>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7v5l3 2" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
  chatbots: (props) => (
    <svg {...shared} {...props} aria-hidden>
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M9 10h.01M13 10h.01M17 10h.01" />
    </svg>
  ),
};

export function ServiceIcon({ slug, ...props }: { slug: ServiceSlug } & IconProps) {
  const Icon = ICONS[slug];
  return <Icon {...props} />;
}
