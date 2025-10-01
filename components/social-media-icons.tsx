import Link from "next/link";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

interface SocialMediaIconsProps {
  iconStyle?: string;
  containerStyle?: string;
  data?: any;
}

export default function SocialMediaIcons({
  iconStyle,
  containerStyle,
  data,
}: SocialMediaIconsProps) {
  const getIcon = (platform: string) => {
    const iconMap: { [key: string]: any } = {
      facebook: FaFacebookF,
      whatsapp: FaWhatsapp,
      twitter: FaXTwitter,
      instagram: FaInstagram,
    };
    return iconMap[platform];
  };

  // Default social media links when no data is provided
  const defaultSocialLinks = [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "whatsapp", url: "https://wa.me" },
  ];

  // Use provided data or fallback to default
  const socialLinks =
    data?.social_links?.length > 0 ? data.social_links : defaultSocialLinks;

  return (
    <div
      className={`flex items-center gap-3 justify-end ${containerStyle || ""}`}
    >
      {socialLinks?.map(
        ({ platform, url }: { platform: string; url: string }) => {
          const IconComponent = getIcon(platform);
          if (!IconComponent) return null;

          return (
            <Link href={url} key={url}>
              <IconComponent
                className={`cursor-pointer ${iconStyle || ""}`}
                title={platform}
              />
            </Link>
          );
        }
      )}
    </div>
  );
}
