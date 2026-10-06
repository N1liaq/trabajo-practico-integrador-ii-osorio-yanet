import bcrypt from "bcryptjs";

export const hashPassword = async (hashPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(hashPassword, saltRounds);

  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
