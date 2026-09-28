import "dotenv/config";
import { password } from "@inquirer/prompts";
import { input } from "@inquirer/prompts";
import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("\nSHATTAAN Administrator Setup\n");

  const email = "shattaan.1@gmail.com";

  const name = await input({
    message: "Administrator name:",
    default: "MANSOUR KARAR",
  });

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.role === "ADMIN") {
      console.log(`\nAn administrator account already exists for ${email}.`);
      return;
    }

    await prisma.user.update({
      where: { email },
      data: {
        role: "ADMIN",
        name: name.trim() || existingUser.name,
      },
    });

    console.log(`\nExisting user ${email} has been promoted to ADMIN.`);
    return;
  }

  const adminPassword = await password({
    message: "Administrator password:",
    mask: "*",
    validate(value) {
      if (value.length < 8) {
        return "Password must be at least 8 characters.";
      }

      return true;
    },
  });

  const passwordHash = await hash(adminPassword, 12);

  const user = await prisma.user.create({
    data: {
      name: name.trim() || "SHATTAAN Administrator",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("\nAdministrator account created successfully.");
  console.log(`Email: ${user.email}`);
  console.log("Role: ADMIN");
  console.log("\nYou can now use this account to sign in to SHATTAAN.");
}

main()
  .catch((error) => {
    console.error("\nFailed to create administrator:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });