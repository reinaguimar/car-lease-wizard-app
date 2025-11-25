-- Adicionar campos para produtos/serviços opcionais e condutor adicional na tabela rentals
ALTER TABLE public.rentals
ADD COLUMN additional_products jsonb DEFAULT '[]'::jsonb,
ADD COLUMN additional_driver_name text,
ADD COLUMN additional_driver_id_number text,
ADD COLUMN additional_driver_license text;

-- Comentários para documentação
COMMENT ON COLUMN public.rentals.additional_products IS 'Array de produtos/serviços adicionais contratados: [{name: string, description?: string, quantity?: number}]';
COMMENT ON COLUMN public.rentals.additional_driver_name IS 'Nome completo do condutor adicional';
COMMENT ON COLUMN public.rentals.additional_driver_id_number IS 'Número do documento de identidade do condutor adicional';
COMMENT ON COLUMN public.rentals.additional_driver_license IS 'Número da CNH do condutor adicional';