
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppState } from '../AppStateContext';
import { useLanguage } from '../LanguageContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProductId?: number;
}

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Price must be a positive number" }
  ),
  cost: z.string().min(1, "Cost is required").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Cost must be a positive number" }
  ),
  category: z.string().min(1, "Category is required")
});

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, editingProductId }) => {
  const { state, addProduct, editProduct } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "0",
      cost: "0",
      category: "cookies"
    }
  });

  // Reset form when modal opens/closes or when editing a different product
  useEffect(() => {
    if (isOpen) {
      if (editingProductId) {
        const product = state.products.find(p => p.id === editingProductId);
        if (product) {
          setIsEditing(true);
          form.reset({
            name: product.name,
            price: product.price.toString(),
            cost: product.cost.toString(),
            category: product.category
          });
        }
      } else {
        setIsEditing(false);
        form.reset({
          name: "",
          price: "0",
          cost: "0",
          category: "cookies"
        });
      }
    }
  }, [isOpen, editingProductId, state.products, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const productData = {
      name: values.name,
      price: parseFloat(values.price),
      cost: parseFloat(values.cost),
      category: values.category
    };

    if (isEditing && editingProductId) {
      editProduct(editingProductId, productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? t('editProductTitle') : t('addProductModalTitle')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('productNameLabel')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('productPriceLabel')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.01" min="0" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('productCostLabel')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.01" min="0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('productCategoryLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectProductPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cookies">{t('categoryCookies')}</SelectItem>
                      <SelectItem value="cakes">{t('categoryCakes')}</SelectItem>
                      <SelectItem value="almonds">{t('categoryAlmonds')}</SelectItem>
                      <SelectItem value="candles">{t('categoryCandles')}</SelectItem>
                      <SelectItem value="handicrafts">{t('categoryHandicrafts')}</SelectItem>
                      <SelectItem value="other">{t('categoryOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t('cancelButton')}
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {isEditing ? t('saveProductButton') : t('saveProductButton')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
