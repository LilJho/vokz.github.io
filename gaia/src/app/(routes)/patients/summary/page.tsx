import PatientStatus from "@/components/views/patients/PatientStatus";
import PatientsProfile from "@/components/views/patients/PatientsProfile";
import PatientsRecord from "@/components/views/patients/PatientsRecord";
import PatientData from "@/data/patients_data.json";
import SubmitReport from "@/components/views/patients/SubmitReport";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs/tabs-modified";
import dynamic from "next/dynamic";
import { getUserSessionData } from "@/services/getUserSessionData";
import { TbUser, TbInfoSquare } from "react-icons/tb";
import { PatientsInformationService } from "@/services/databaseServices";
import { LuImage, LuSettings, LuTarget } from "react-icons/lu";
import PatientsFormTab from "@/components/views/patients/PatientsFormTab/PatientsFormTab";
import MedicalInfographics from "@/components/views/patients/PatientsFormTab/MedicalInfographics/MedicalInfographics";

const EditPatientForm = dynamic(
  () => import("@/components/views/NewPatientForm/EditPatientForm")
);

const PatientsPage = async () => {
  const { userData } = await getUserSessionData();

  const response = await PatientsInformationService.getOne(
    "id",
    "91cf16bd-e577-4ed5-975e-c6ee02d3e84b"
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Patients Profile</h2>
        <SubmitReport />
      </div>
      <Tabs className="w-full" defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">
            <TbUser className="relative w-5 h-5 mr-2 -top-[1px]" /> Profile
          </TabsTrigger>
          <TabsTrigger value="patient-info">
            <TbInfoSquare className="relative w-5 h-5 mr-2 -top-[1px]" />{" "}
            Information
          </TabsTrigger>
          <TabsTrigger value="goal">
            <LuTarget className="relative w-5 h-5 mr-2 -top-[1px]" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="medical-graphics">
            <LuImage className="relative w-5 h-5 mr-2 -top-[1px]" /> Medical
            Infographics
          </TabsTrigger>
          {userData.role === "patient" && (
            <TabsTrigger value="account-settings">
              <LuSettings className="relative w-5 h-5 mr-2 -top-[1px]" />
              Account Settings
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex flex-col gap-2 xl:flex-row">
            <div className="flex flex-col gap-8 xl:flex-row">
              <PatientsProfile />
            </div>
            <div className="flex flex-col flex-1 gap-2 xl:flex-col">
              <PatientStatus />
              <PatientsRecord data={PatientData} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="patient-info">
          <PatientsFormTab response={response} userData={userData} />
        </TabsContent>
        <TabsContent value="goal">
          <div>Goal</div>
        </TabsContent>
        <TabsContent value="medical-graphics">
          <MedicalInfographics />
        </TabsContent>
        <TabsContent value="account-settings">
          <div>Account settings</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientsPage;
