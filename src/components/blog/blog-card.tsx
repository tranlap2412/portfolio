import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { format } from "date-fns";

interface Props {
  id: string; // 🔁 dùng id thay slug
  title: string;
  dates: string;
  location?: string;
  image?: string;
  href?: string;
}

export function BlogCard({ id, title, dates, location, image, href }: Props) {
  // ✅ Nếu ảnh từ domain ngoài không hợp lệ, fallback về placeholder
  const safeImage =
    image && image.startsWith("http") ? image : "/placeholder.jpg";
  const link = href || `/blog/${id}`;

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center">
        <Avatar className="m-auto size-12 rounded-md border border-border/60">
          <AvatarImage
            src={safeImage}
            alt={title}
            className="object-cover"
          />
          <AvatarFallback>{title ? title[0] : "?"}</AvatarFallback>
        </Avatar>
      </div>

      <Link
        href={link}
        className="flex flex-1 flex-col justify-start gap-1.5"
      >
        {dates && (
          <time className="text-xs text-muted-foreground">
            {format(new Date(dates), "dd MMMM, yyyy")}
          </time>
        )}
        <h2 className="text-base font-semibold leading-snug text-foreground/95 transition-colors hover:text-foreground">
          {title}
        </h2>
      </Link>
    </li>
  );
}
