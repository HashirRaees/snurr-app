import { FaEthereum, FaLitecoinSign } from "react-icons/fa6";
import { SiTether } from "react-icons/si";
import { MdCurrencyBitcoin } from "react-icons/md";

export const CRYPTO_OPTIONS = [
  {
    id: "btc",
    name: "BTC",
    fullName: "Bitcoin",
    icon: MdCurrencyBitcoin,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "eth",
    name: "ETH",
    fullName: "Ethereum",
    icon: FaEthereum,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: "usdt",
    name: "USDT",
    fullName: "Tether",
    icon: SiTether,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: "ltc",
    name: "LTC",
    fullName: "Litecoin",
    icon: FaLitecoinSign,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export const RECENT_DEPOSITS = [
  {
    amount: "0.0145 BTC",
    time: "2 hours ago",
    status: "Completed",
    color: "text-green-400",
  },
  {
    amount: "1.234 ETH",
    time: "1 day ago",
    status: "Pending",
    color: "text-yellow-400",
  },
];
