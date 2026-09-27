import api from "@/lib/axios";
import {CreateBankAccountValues} from "@/validation/bank-accounts/schemas/bank-account.schema";

/* -------------------------------------------------------------------------- */
/*                            Get All Bank Accounts                           */
/* -------------------------------------------------------------------------- */

export async function getBankAccounts() {
    const {data} = await api.get("/bank-accounts/");
    return data;
}

/* -------------------------------------------------------------------------- */
/*                            Get One Bank Account                            */
/* -------------------------------------------------------------------------- */

export async function getOneBankAccount(id: number | string) {
    const {data} = await api.get(`/bank-accounts/${id}`);
    return data;
}

/* -------------------------------------------------------------------------- */
/*                            Create Bank Account                             */
/* -------------------------------------------------------------------------- */

export async function createBankAccount(data: CreateBankAccountValues & {imageFile?: File | null}) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("account_number", data.account_number);

    if (data.imageFile) {
        formData.append("path_image", data.imageFile);
    }

    const {data: response} = await api.post("/bank-accounts/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
}

/* -------------------------------------------------------------------------- */
/*                            Update Bank Account                             */
/* -------------------------------------------------------------------------- */

export async function updateBankAccount(
    id: number | string,
    data: CreateBankAccountValues & {imageFile?: File | null}
) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("account_number", data.account_number);

    if (data.imageFile) {
        formData.append("path_image", data.imageFile);
    }

    const {data: response} = await api.put(`/bank-accounts/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
}

/* -------------------------------------------------------------------------- */
/*                         Toggle Bank Account Status                         */
/* -------------------------------------------------------------------------- */

export async function toggleBankAccountStatus(id: number | string) {
    const {data} = await api.patch(`/bank-accounts/${id}/status`);
    return data;
}

/* -------------------------------------------------------------------------- */
/*                            Delete Bank Account                             */
/* -------------------------------------------------------------------------- */

export async function deleteBankAccount(id: number | string) {
    const {data} = await api.delete(`/bank-accounts/${id}`);
    return data;
}
