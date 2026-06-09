import * as zod from "zod";

export const LoginValidation = zod.object({
  email: zod
    .string({ message: "Email é obrigatório" })
    .email("Email inválido"),
  password: zod
    .string({ message: "Senha é obrigatória" })
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginValidator = zod.infer<typeof LoginValidation>;
