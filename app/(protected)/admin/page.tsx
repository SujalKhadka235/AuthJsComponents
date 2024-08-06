"use client";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSucess } from "@/components/form-sucess";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";
const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((response) => {
      if (response.success) {
        toast.success(response.success);
      } else {
        toast.error(response.error);
      }
    });
  };
  const onApiRouteclick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API route");
      } else {
        toast.error("Forbidden allowed route");
      }
    });
  };
  const role = useCurrentRole();
  return (
    <Card>
      <CardHeader className="w-[600px]">
        <p className="text-2xl font-semibold text-center">🗝️Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSucess message="You are allowed to see this content" />
          <div className="flex flex-row items-center justify-between border p-3 rounded-lg shadow-md">
            <p className="text-sm font-medium">Admin-only Api Route</p>
            <Button onClick={onApiRouteclick}>Click to test</Button>
          </div>
          <div className="flex flex-row items-center justify-between border p-3 rounded-lg shadow-md">
            <p className="text-sm font-medium">Admin-only Server Action</p>
            <Button onClick={onServerActionClick}>Click to test</Button>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
