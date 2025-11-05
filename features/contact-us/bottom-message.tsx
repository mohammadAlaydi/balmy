import { Card, CardContent } from "@/components/ui/card";

export default function BottomMessage({ t }: { t: any }) {
    
  return (
    <div className="mt-12 sm:mt-16 text-center">
      <Card className="bg-muted/50">
        <CardContent className="pt-6 px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {t("we-are-here-to-help")}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("we-are-here-to-help-desc")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
