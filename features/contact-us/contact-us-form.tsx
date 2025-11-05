import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function ConatctUsForm({ t }: { t: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-semibold">
          {t("send-message")}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {t("we-are-here-to-help-desc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm sm:text-base">
                {t("first-name")}
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder={t("first-name-placeholder")}
                className="text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm sm:text-base">
                {t("last-name")}
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={t("last-name-placeholder")}
                className="text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">
              {t("email")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("email-placeholder")}
              className="text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm sm:text-base">
              {t("phone")}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t("phone-placeholder")}
              className="text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm sm:text-base">
              {t("subject")}
            </Label>
            <Select name="subject" required>
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue placeholder={t("choose-subject")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general" className="text-sm sm:text-base">
                  {t("general-inquiry")}
                </SelectItem>
                <SelectItem value="order" className="text-sm sm:text-base">
                  {t("order-inquiry")}
                </SelectItem>
                <SelectItem value="product" className="text-sm sm:text-base">
                  {t("product-inquiry")}
                </SelectItem>
                <SelectItem value="complaint" className="text-sm sm:text-base">
                  {t("complaint")}
                </SelectItem>
                <SelectItem value="suggestion" className="text-sm sm:text-base">
                  {t("suggestion")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm sm:text-base">
              {t("message")}
            </Label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t("message-placeholder")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full text-sm sm:text-base"
            size="lg"
          >
            {t("send-message-button")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
