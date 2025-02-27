import Image from "next/image";
import { Button } from "@/components/ui/button";
import trash_truck from "../../../public/admin/trash-truck.png";
import door_step_service from "../../../public/front-page/services/door-step service.jpg";
import trash_report from "../../../public/front-page/services/earn-credit-points.jpg";
import Link from "next/link";

const AdminLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="min-h-screen flex flex-col items-center justify-center  p-6">
        <Image
          src={trash_truck}
          alt="Admin Panel Image"
          width={350}
          height={350}
          className="mb-2"
        />
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Image
              src={door_step_service}
              alt="Door-Step Service"
              width={300}
              height={300}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Door-Step Service Requests
            </h2>
            <Link href="/admin/service-table">
              <Button className="w-full">View Requests</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Image
              src={trash_report}
              alt="Trash Reports"
              width={300}
              height={300}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">Trash Reports</h2>
            <Button className="w-full">View Reports</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
