import crypto from "crypto";

export function generateReferralCode(name : string) {
  if (!name || typeof name !== "string") {
    throw new Error("Name must be a valid string");
  }

  const cleanName = name.trim().toUpperCase().replace(/\s+/g, "");

  const namePart = cleanName.slice(0, 2).padEnd(2, "X");

  let randomPart = crypto.randomBytes(6).toString("base64");

  randomPart = randomPart.replace(/\+/g, "A").replace(/\//g, "B").replace(/=/g, "");

  const referralCode = `${namePart}${randomPart.slice(0, 6)}`;

  return referralCode.toUpperCase();
}
