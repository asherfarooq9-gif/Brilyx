import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const imgPath = path.join(process.cwd(), "public", "post_1789337612.jpg");
  if (!fs.existsSync(imgPath)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const buf = fs.readFileSync(imgPath);
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
