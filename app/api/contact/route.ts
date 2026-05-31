import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "");
    const company = String(formData.get("company") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const part = String(formData.get("part") || "");
    const brand = String(formData.get("brand") || "");
    const quantity = String(formData.get("quantity") || "");
    const message = String(formData.get("message") || "");

    const files = formData.getAll("attachments") as File[];

    const attachments = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();

        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer),
          contentType: file.type,
        });
      }
    }

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
      from: `"Xeltronic Contact" <info@xeltronic.com>`,
      to: "info@xeltronic.com",
      replyTo: email,
      subject: `New Contact Message - ${part || name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Part Number:</b> ${part}</p>
        <p><b>Brand:</b> ${brand}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <hr />
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}