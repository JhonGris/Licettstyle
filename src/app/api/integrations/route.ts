import { NextResponse } from "next/server";
import { hasCloudinaryConfig } from "@/lib/cloudinary";

export function GET() {
  return NextResponse.json({
    cloudinary: {
      configured: hasCloudinaryConfig(),
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? null,
    },
    googleSheets: {
      configured: Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID),
      spreadsheetId:
        process.env.GOOGLE_SHEETS_SPREADSHEET_ID ??
        "1ee_1YHyeTkaILri8qKyk35So2mocTfr-RsYS3LEcCGo",
    },
  });
}
