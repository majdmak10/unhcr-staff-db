export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/buttons/AddButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import Table from "@/components/table/Table";
import staffColumns from "@/constants/staffColumns";
import { Suspense } from "react";
import { getProfilePicture } from "@/utils/userUtils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getStaff } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";

const StaffPage = async () => {
  return <div className="">Staff Page</div>;
};

export default StaffPage;
