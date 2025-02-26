import { getServiceRequests } from "@/actions/admin";
import ServiceRequestsTable from "@/components/admin/service-request-table";

const AdminPage = async () => {
  const services = await getServiceRequests();
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Service Request Management
      </h1>
      <ServiceRequestsTable initialServices={services} />
    </div>
  );
};

export default AdminPage;
