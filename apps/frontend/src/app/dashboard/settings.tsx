import { DashboardLayout } from "@/components/layouts/dashboard";
import { Button } from "@/components/ui";
import { useAuthContext } from "@/hooks/use-auth-context";
import { api } from "@/lib/firebase";

export default function Index() {
  const { signOut } = useAuthContext();

  return (
    <DashboardLayout className="flex flex-col gap-4">
      <Button
        onPress={async () => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          await signOut();
        }}
        text="Sign Out"
      />

      <Button
        onPress={async () => {
          console.log("performFakeGambling");
          await api({
            endpoint: "test-performFakeGambling",
          });
          console.log("performFakeGambling done");
        }}
        text="Fake gamble transaction"
      />

      {/* <Button onPress={() => {}}>Fake gamble transaction</Button> */}
    </DashboardLayout>
  );
}
