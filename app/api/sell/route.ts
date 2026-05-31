import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const company = formData.get("company") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const files = formData.getAll("files") as File[];

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );
console.log("HOST =", process.env.SMTP_HOST);
console.log("PORT =", process.env.SMTP_PORT);
console.log("USER =", process.env.SMTP_USER);
    const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@xeltronic.com",
    pass: "Xel2026*",
  },
});

    await transporter.sendMail({
      from: `"Xeltronic Sell Form" <info@xeltronic.com>`,
      to: "info@xeltronic.com",
      subject: "New Inventory Submission - Sell Us Your Parts",
      html: `
        <h2>New Inventory Submission</h2>
        <p><b>Company:</b> ${company}</p>
        <p><b>Contact Person:</b> ${contact}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>WhatsApp / Phone:</b> ${phone}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}