import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

interface SocialMediaIconsProps {
  iconStyle?: string;
  containerStyle?: string;
}

const SOCIAL_MEDIA_ICONS = [
  { Icon: FaFacebookF, name: "Facebook" },
  { Icon: FaWhatsapp, name: "WhatsApp" },
  { Icon: FaXTwitter, name: "X (Twitter)" },
  { Icon: FaInstagram, name: "Instagram" },
];

export default function SocialMediaIcons({ iconStyle , containerStyle}: SocialMediaIconsProps) {
  return (
    <div className={`flex items-center gap-3 justify-end ${containerStyle || ""}`}>
      {SOCIAL_MEDIA_ICONS.map(({ Icon, name }) => (
        <Icon
          key={name}
          className={`text-xl cursor-pointer ${iconStyle || ""}`}
          title={name}
        />
      ))}
    </div>
  );
}
