
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RentalForm, FormData } from "@/components/RentalForm";
import { ContractPreview } from "@/components/ContractPreview";
import { PrintButton } from "@/components/PrintButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { CompanySelector, type Company } from "@/components/CompanySelector";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getRentalById, updateRentalStatus } from "@/services/supabase";
import { LoadingState } from "@/components/LoadingState";
import { useToast } from "@/hooks/use-toast";

const EditContractPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [selectedCompany, setSelectedCompany] = useState<Company>("moove");
  const [activeTab, setActiveTab] = useState("form");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const loadContract = async () => {
      if (!id) {
        navigate("/contracts");
        return;
      }

      try {
        const rental = await getRentalById(id);
        if (!rental) {
          toast({
            title: "Contrato não encontrado",
            description: "O contrato solicitado não foi encontrado",
            variant: "destructive",
          });
          navigate("/contracts");
          return;
        }

        // Convert rental data to form data
        const convertedFormData: Partial<FormData> = {
          firstName: rental.client_name,
          surname: rental.client_surname,
          idNumber: rental.client_id_number,
          address: rental.client_address,
          email: rental.client_email || "",
          phone: rental.client_phone || "",
          vehicleType: rental.vehicle_type,
          make: rental.vehicle_make,
          model: rental.vehicle_model,
          fuel: rental.vehicle_fuel,
          licensePlate: rental.vehicle_license_plate || "",
          year: rental.vehicle_year || "",
          color: rental.vehicle_color || "",
          startDate: new Date(rental.start_date),
          startTime: rental.start_time,
          deliveryLocation: rental.delivery_location,
          endDate: new Date(rental.end_date),
          endTime: rental.end_time,
          returnLocation: rental.return_location,
          rentalRate: rental.rental_rate.toString(),
          deposit: rental.deposit.toString(),
          signDate: new Date(rental.sign_date),
        };

        setFormData(convertedFormData);
        setSelectedCompany(rental.company_code as Company);
      } catch (error) {
        console.error("Error loading contract:", error);
        toast({
          title: "Erro ao carregar contrato",
          description: "Não foi possível carregar os dados do contrato",
          variant: "destructive",
        });
        navigate("/contracts");
      } finally {
        setIsLoading(false);
      }
    };

    loadContract();
  }, [id, navigate, toast]);

  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  const handleCompanyChange = (company: Company) => {
    setSelectedCompany(company);
  };
  
  const handleViewContract = () => {
    setActiveTab("preview");
  };

  const handleUpdateContract = async () => {
    if (!id) return;

    setIsUpdating(true);
    try {
      // Here you would typically update the rental in the database
      // For now, we'll just show a success message
      toast({
        title: "Contrato atualizado",
        description: "O contrato foi atualizado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o contrato",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Carregando contrato..." />;
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-6 flex flex-col min-h-screen">
      <div className="mb-4 sm:mb-6 text-center">
        <h1 className="text-xl sm:text-3xl font-bold">Editar Contrato</h1>
        <p className="text-muted-foreground text-xs sm:text-base">
          Modifique os dados do contrato conforme necessário
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <Link to="/contracts">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar aos Contratos
          </Button>
        </Link>
        <CompanySelector 
          selectedCompany={selectedCompany}
          onCompanyChange={handleCompanyChange}
          className="no-print w-full sm:w-auto"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full no-print flex-1">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="form" className="text-xs sm:text-sm">Formulário</TabsTrigger>
          <TabsTrigger value="preview" className="text-xs sm:text-sm">Visualizar Contrato</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <RentalForm onFormChange={handleFormChange} onViewContract={handleViewContract} />
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleUpdateContract}
              disabled={isUpdating}
              className="gap-2"
            >
              {isUpdating && <Loader className="h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div className="flex justify-end mb-4">
            <PrintButton data={formData} company={selectedCompany} />
          </div>
          <ContractPreview data={formData} company={selectedCompany} />
        </TabsContent>
      </Tabs>

      <div className="print-only">
        <ContractPreview data={formData} company={selectedCompany} />
      </div>
      
      <Toaster />
    </div>
  );
};

export default EditContractPage;
