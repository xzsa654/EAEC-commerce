import { useUserStore } from "@/stores/useUserStore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { LogOut, Store, User } from "lucide-react";
export default function UserDropDown() {
  const { logout } = useUserStore();
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <User size={22} className={" cursor-pointer text-default-500"} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" variant="flat">
        <DropdownSection>
          <DropdownItem
            key="profile"
            href="/dashboard"
            startContent={<Store size={18} />}
          >
            管理賣場
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            startContent={<LogOut size={18} />}
            color="danger"
            onPress={() => logout()}
          >
            登出
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
