import {z} from "zod";

export const bankAccountSchema = z.object({
    bank_account_id: z.number().optional(),
    name: z.string().min(2, "اسم الحساب أو البنك مطلوب"),
    account_number: z.string().min(3, "رقم الحساب مطلوب"),
    path_image: z.any().optional(),
    is_active: z.boolean(),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
});

export const createBankAccountSchema = z.object({
    name: z.string().min(2, "اسم الحساب أو البنك مطلوب"),
    account_number: z.string().min(3, "رقم الحساب مطلوب"),
    path_image: z.any().optional(),
});

export type BankAccount = z.infer<typeof bankAccountSchema>;
export type CreateBankAccountValues = z.infer<typeof createBankAccountSchema>;
