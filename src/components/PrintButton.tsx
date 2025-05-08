
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { FormData } from "./RentalForm";
import { type Company } from "./CompanySelector";
import { createPDFWindow, populatePDFContent } from "./pdf/PDFWindowCreator";
import { useState } from "react";
import { 
  createClientHelper as createClient, 
  createVehicleHelper as createVehicle, 
  createContractHelper as createContract,
  getCompanyByCode 
} from "@/services/supabase";

interface PrintButtonProps {
  data: Partial<FormData>;
  company: Company;
}

export function PrintButton({ data, company }: PrintButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  
  // Função para verificar se todos os dados estão preenchidos
  const isFormDataComplete = (data: Partial<FormData>): boolean => {
    const requiredFields = [
      'firstName', 'surname', 'idNumber', 'address',
      'vehicleType', 'make', 'model', 'fuel',
      'startDate', 'startTime', 'endDate', 'endTime',
      'deliveryLocation', 'returnLocation',
      'rentalRate', 'deposit', 'signDate'
    ];
    
    return requiredFields.every(field => Boolean(data[field as keyof FormData]));
  };
  
  // Verifica se o formulário está completo
  const isComplete = isFormDataComplete(data);
  
  // Função para obter o ID da empresa a partir do código
  const getCompanyId = async (companyCode: string): Promise<string> => {
    try {
      console.log("Iniciando busca de ID da empresa para o código:", companyCode);
      
      // Tentar obter o ID da empresa do banco de dados
      const companyData = await getCompanyByCode(companyCode);
      
      if (companyData && companyData.id) {
        console.log(`ID da empresa ${companyCode} obtido do banco de dados:`, companyData.id);
        return companyData.id;
      } else {
        // Se não encontrou a empresa, tentar criar a empresa no banco
        console.log("Empresa não encontrada no banco de dados, verificando se precisa inserir...");
        
        // Valores padrão para as empresas
        const companyDefaults: Record<string, any> = {
          'moove': {
            name: 'Moove Locadora de Veículos S/A',
            cnpj: '26.875.530/0001-77',
            logo_url: '/lovable-uploads/77ecfed0-4dfe-41b1-a907-c8c9241166ee.png',
            theme_color: '#4B80C3'
          },
          'yoou': {
            name: 'Yoou Rent a Car LLC',
            cnpj: 'L00000000000000',
            logo_url: '/lovable-uploads/84eac6d9-3068-4699-b09d-04269c7c8870.png',
            theme_color: '#EF65CF'
          }
        };
        
        // Verificar se temos padrões para essa empresa
        if (companyDefaults[companyCode]) {
          try {
            const { data: newCompany, error } = await supabase
              .from('companies')
              .insert([{
                code: companyCode,
                ...companyDefaults[companyCode]
              }])
              .select();
              
            if (error) {
              throw error;
            }
            
            if (newCompany && newCompany.length > 0) {
              console.log(`Empresa ${companyCode} criada com sucesso. ID:`, newCompany[0].id);
              return newCompany[0].id;
            }
          } catch (insertError) {
            console.error(`Erro ao criar empresa ${companyCode}:`, insertError);
          }
        }
        
        // Fallback para IDs fixos caso todas as tentativas falhem
        console.warn("Usando IDs fixos como último recurso");
        const companyIds: Record<string, string> = {
          'moove': '79c81b51-8a37-46f0-9b67-d38e3ab6d159',
          'yoou': '23a81c52-8b38-47f1-9c67-e37e4ab6d160'
        };
        return companyIds[companyCode] || companyIds['moove'];
      }
    } catch (error) {
      console.error("Erro ao obter ID da empresa:", error);
      
      // Fallback para IDs fixos em caso de erro
      console.warn("Usando IDs fixos devido a erro");
      const companyIds: Record<string, string> = {
        'moove': '79c81b51-8a37-46f0-9b67-d38e3ab6d159',
        'yoou': '23a81c52-8b38-47f1-9c67-e37e4ab6d160'
      };
      return companyIds[companyCode] || companyIds['moove'];
    }
  };
  
  const handleSaveAsPDF = async () => {
    try {
      setIsSaving(true);
      
      // Verificar se todos os dados necessários estão presentes
      if (!isComplete) {
        toast.error("Por favor, complete todos os campos do formulário antes de salvar");
        return;
      }
      
      toast.info("Salvando contrato e preparando PDF...");
      
      // 1. Criar ou buscar cliente no banco de dados
      const clientData = {
        first_name: data.firstName!,
        surname: data.surname!,
        id_number: data.idNumber!,
        address: data.address!
      };
      
      const client = await createClient(clientData);
      
      if (!client) {
        throw new Error("Erro ao criar/buscar cliente");
      }
      
      // 2. Obter o ID da empresa e criar ou buscar veículo
      const companyId = await getCompanyId(company);
      console.log("Usando company_id:", companyId, "para empresa:", company);
      
      const vehicleData = {
        vehicle_type: data.vehicleType!,
        make: data.make!,
        model: data.model!,
        fuel: data.fuel!,
        company_id: companyId
      };
      
      const vehicle = await createVehicle(vehicleData);
      
      if (!vehicle) {
        throw new Error("Erro ao criar/buscar veículo");
      }
      
      // 3. Criar contrato no banco de dados
      const contractData = {
        contract_number: generateContractNumber(),
        client_id: client.id,
        vehicle_id: vehicle.id,
        company_id: companyId,
        start_date: formatDateToISO(data.startDate!),
        start_time: data.startTime!,
        end_date: formatDateToISO(data.endDate!),
        end_time: data.endTime!,
        delivery_location: data.deliveryLocation!,
        return_location: data.returnLocation!,
        rental_rate: parseFloat(data.rentalRate!),
        deposit: parseFloat(data.deposit!),
        sign_date: formatDateToISO(data.signDate!)
      };
      
      console.log("Dados do contrato a serem salvos:", contractData);
      
      const contract = await createContract(contractData);
      
      if (!contract) {
        throw new Error("Erro ao criar contrato");
      }
      
      // 4. Gerar o PDF
      const pdfWindow = createPDFWindow({ data, company });
      
      if (pdfWindow) {
        populatePDFContent(pdfWindow, company);
        
        // Informação ao usuário
        toast.success("Contrato salvo com sucesso!", {
          description: `Nº ${contractData.contract_number}`,
          duration: 5000
        });
        
        // Instruções para salvar o PDF
        setTimeout(() => {
          toast.info("Utilize a opção 'Salvar como PDF' na janela de impressão para gerar o documento PDF");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      toast.error("Erro ao salvar contrato", {
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Função para formatar data para ISO string (YYYY-MM-DD)
  const formatDateToISO = (date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Data inválida:", date);
      return new Date().toISOString().split('T')[0]; // Fallback para data atual
    }
    return date.toISOString().split('T')[0];
  };
  
  // Função para gerar número do contrato
  const generateContractNumber = (): string => {
    // Format: YYYY-MM-NNNN (Year-Month-Random)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    
    return `${year}-${month}-${random}`;
  };

  return (
    <Button 
      onClick={handleSaveAsPDF}
      className="no-print mb-6 w-full sm:w-auto text-xs sm:text-sm"
      variant="default"
      disabled={isSaving || !isComplete}
    >
      <Save className="mr-2 h-4 w-4" />
      {isSaving ? "Salvando..." : isComplete ? "Salvar em PDF" : "Preencha todos os campos"}
    </Button>
  );
}
