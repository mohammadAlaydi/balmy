export default function ConatctUsBanner({t} : {t : any}) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed px-2">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
