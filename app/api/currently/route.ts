import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "currently.json");

export async function GET() {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    const json = JSON.parse(raw || "{}");
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({
      whatImInto: {
        watching: [],
        wearing: [],
        reading: [],
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      whatImInto: {
        watching: Array.isArray(body.whatImInto?.watching)
          ? body.whatImInto.watching.map((item: any) => ({
              title: String(item.title || ""),
              url: String(item.url || ""),
            }))
          : [],
        wearing: Array.isArray(body.whatImInto?.wearing)
          ? body.whatImInto.wearing.map((item: any) => ({
              title: String(item.title || ""),
              url: String(item.url || ""),
            }))
          : [],
        reading: Array.isArray(body.whatImInto?.reading)
          ? body.whatImInto.reading.map((item: any) => ({
              title: String(item.title || ""),
              url: String(item.url || ""),
            }))
          : [],
      },
    };
    await fs.writeFile(dataPath, JSON.stringify(payload, null, 2), "utf8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

