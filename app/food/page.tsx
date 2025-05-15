import fs from "fs";
import path from "path";
import BackHomeButton from "@/components/back-home-button";
import Image from "next/image";

// Force static generation
export const dynamic = "force-static";

interface GroupedImages {
  [date: string]: string[];
}

export default async function FoodPage() {
  const imagesDir = path.join(process.cwd(), "public", "food");
  const fileNames = await fs.promises.readdir(imagesDir);
  const images = fileNames.filter((name) => name.endsWith(".jpeg"));

  // Group images by date (yyyy-MM-dd)
  const grouped: GroupedImages = {};
  images.forEach((file) => {
    const [yyyy, mm, dd] = file.split("_");
    const dateKey = `${yyyy}-${mm}-${dd}`;
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(file);
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <BackHomeButton />
      {Object.entries(grouped)
        .sort(([a], [b]) => (a < b ? 1 : -1)) // newest first
        .map(([dateKey, files]) => {
          const formattedDate = new Date(dateKey).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          return (
            <section key={dateKey} className="mb-8">
              <h1 className="font-bold text-xl pt-12 mb-2">{formattedDate}</h1>
              <div className="flex flex-col space-y-4">
                {files.map((file) => (
                  <Image
                    key={file}
                    src={`/food/${file}`}
                    alt={`Essen vom ${formattedDate}`}
                    className="shadow-sm dark:shadow-gray-800"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}
