import { TrendingUp, Sparkles, ShieldCheck, LucideIcon } from "lucide-react";

export const successStories = [
  {
    id: 1,
    name: "Ahmed Al-Farouq",
    job: "Owner of Finvestor",
    avatar: "/img/avatar1.webp",
    description:
      "Finvestor helped me organize my expenses and gain clearer insights into where my money goes.",
  },
  {
    id: 2,
    name: "Ashley Davis",
    job: "Entrepreneur",
    avatar: "/img/avatar2.webp",
    description:
      "Finvestor helped me secure my financial future with expert advice!",
  },
  {
    id: 3,
    name: "Robert Wilson",
    job: "Freelancer",
    avatar: "/img/avatar1.webp",
    description:
      "Trustworthy, knowledgeable, and dedicated financial advisors at Finvestor!",
  },
  {
    id: 4,
    name: "Mike Anderson",
    job: "Startup Founder",
    avatar: "/img/avatar2.webp",
    description:
      "Thanks to Finvestor, I’m on track to achieve my financial goals!",
  },
];

export const whyFinvestor: {
  id: number;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    id: 1,
    icon: TrendingUp,
    description:
      "Effortlessly track your expenses and investments with clear financial insights.",
  },
  {
    id: 2,
    icon: Sparkles,
    description:
      "Get AI-driven recommendations tailored to your financial goals.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    description:
      " Your data is encrypted and protected for complete peace of mind.",
  },
];

export const transactionCategoryStyles = {
  FOOD_AND_DRINK: {
    borderColor: "border-pink-600",

    backgroundColor: "bg-pink-500",

    textColor: "text-pink-700",

    chipBackgroundColor: "bg-inherit",
  },

  Payment: {
    borderColor: "border-success-600",

    backgroundColor: "bg-green-600",

    textColor: "text-success-700",

    chipBackgroundColor: "bg-inherit",
  },

  "Bank Fees": {
    borderColor: "border-success-600",

    backgroundColor: "bg-green-600",

    textColor: "text-success-700",

    chipBackgroundColor: "bg-inherit",
  },

  Transfer: {
    borderColor: "border-red-700",

    backgroundColor: "bg-red-700",

    textColor: "text-red-700",

    chipBackgroundColor: "bg-inherit",
  },

  Processing: {
    borderColor: "border-[#F2F4F7]",

    backgroundColor: "bg-gray-500",

    textColor: "text-[#344054]",

    chipBackgroundColor: "bg-[#F2F4F7]",
  },

  Success: {
    borderColor: "border-[#12B76A]",

    backgroundColor: "bg-[#12B76A]",

    textColor: "text-[#027A48]",

    chipBackgroundColor: "bg-[#ECFDF3]",
  },

  default: {
    borderColor: "",

    backgroundColor: "bg-blue-500",

    textColor: "text-blue-700",

    chipBackgroundColor: "bg-inherit",
  },
};
export const daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
