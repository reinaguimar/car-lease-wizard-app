import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "../RentalForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface AdditionalProductsProps {
  form: UseFormReturn<FormData>;
  handleFormChange: (field: keyof FormData, value: any) => void;
}

interface Product {
  name: string;
  description?: string;
  quantity?: number;
}

export function AdditionalProducts({ form, handleFormChange }: AdditionalProductsProps) {
  const currentProducts = form.getValues("additionalProducts");
  const [products, setProducts] = useState<Product[]>(
    (currentProducts as Product[]) || []
  );
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    quantity: 1,
  });

  const addProduct = () => {
    if (!newProduct.name.trim()) return;
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    handleFormChange("additionalProducts", updatedProducts);
    
    // Reset form
    setNewProduct({ name: "", description: "", quantity: 1 });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    handleFormChange("additionalProducts", updatedProducts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Produtos/Serviços Adicionais</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Adicione proteções, acessórios ou serviços extras contratados
        </p>
      </div>

      {/* Lista de produtos adicionados */}
      {products.length > 0 && (
        <div className="space-y-2">
          {products.map((product, index) => (
            <Card key={index}>
              <CardContent className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  {product.description && (
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  )}
                  {product.quantity && product.quantity > 1 && (
                    <p className="text-sm text-muted-foreground">Quantidade: {product.quantity}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProduct(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Formulário para adicionar novo produto */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Nome do Produto/Serviço *</Label>
            <Input
              id="productName"
              placeholder="Ex: PROTEÇÃO SUPER ZERO"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Descrição (opcional)</Label>
            <Input
              id="productDescription"
              placeholder="Ex: Proteção completa contra danos"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productQuantity">Quantidade</Label>
            <Input
              id="productQuantity"
              type="number"
              min="1"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 1 })}
            />
          </div>

          <Button type="button" onClick={addProduct} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto/Serviço
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
