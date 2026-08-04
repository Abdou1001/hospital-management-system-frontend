"use client";


import HeaderSection from "@/components/shared/headerSection";

import {DataTable} from "../components/table/DataTable";
import {usersColumns} from "../components/table/columns/users.columns";

import UserToolbar from "./_components/UserToolbar";

import {useUsers} from "@/hooks/users/useUsers";
import { useTableFilters } from "@/hooks/shared/useTableFilters";
import { USER_FILTERS } from "@/types/filter";

export default function UsersPage() {

    const {filters, setFilters} = useTableFilters(USER_FILTERS);

    const {data, isLoading} = useUsers(filters);

    return (
        <div className="space-y-6">
            <HeaderSection text="إدارة المستخدمين" />

            <UserToolbar filters={filters} onFiltersChange={setFilters} />

            <DataTable
                columns={usersColumns}
                data={data?.results ?? []}
                isLoading={isLoading}
                pagination={data?.pagination}
                onPageChange={(page) =>
                    setFilters({
                        page,
                    })
                }
            />
        </div>
    );
}
