
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
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppState, Discount } from '../AppStateContext';
import { useLanguage } from '../LanguageContext';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingDiscountId?: number;
}

const formSchema = z.object({
  name: z.string().min(1, "Discount name is required"),
  type: z.enum(["bundle", "percentage", "fixed"]),
  productId: z.string().min(1, "Product is required"),
  bundleQuantity: z.string().optional(),
  bundlePrice: z.string().optional(),
  percentageValue: z.string().optional(),
  fixedAmount: z.string().optional(),
  withProduct: z.boolean().optional(),
  withProductId: z.string().optional()
});

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, editingDiscountId }) => {
  const { state, addDiscount, editDiscount } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  const [discountType, setDiscountType] = useState<"bundle" | "percentage" | "fixed">("bundle");
  const [showWithProduct, setShowWithProduct] = useState(false);
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "bundle",
      productId: "",
      bundleQuantity: "2",
      bundlePrice: "0",
      percentageValue: "10",
      fixedAmount: "0",
      withProduct: false,
      withProductId: ""
    }
  });

  // Reset form when modal opens/closes or when editing a different discount
  useEffect(() => {
    if (isOpen) {
      if (editingDiscountId) {
        const discount = state.discounts.find(d => d.id === editingDiscountId);
        if (discount) {
          setIsEditing(true);
          setDiscountType(discount.type);
          
          const formValues: any = {
            name: discount.name,
            type: discount.type,
            productId: discount.productId.toString()
          };

          if (discount.type === 'bundle') {
            formValues.bundleQuantity = discount.params.quantity?.toString() || "2";
            formValues.bundlePrice = discount.params.price?.toString() || "0";
          } else if (discount.type === 'percentage') {
            formValues.percentageValue = discount.params.percentage?.toString() || "10";
          } else if (discount.type === 'fixed') {
            formValues.fixedAmount = discount.params.amount?.toString() || "0";
            if (discount.params.withProduct) {
              formValues.withProduct = true;
              formValues.withProductId = discount.params.withProduct.toString();
              setShowWithProduct(true);
            }
          }

          form.reset(formValues);
        }
      } else {
        setIsEditing(false);
        setDiscountType("bundle");
        setShowWithProduct(false);
        
        const defaultProductId = state.products.length > 0 ? state.products[0].id.toString() : "";
        
        form.reset({
          name: "",
          type: "bundle",
          productId: defaultProductId,
          bundleQuantity: "2",
          bundlePrice: "0",
          percentageValue: "10",
          fixedAmount: "0",
          withProduct: false,
          withProductId: defaultProductId
        });
      }
    }
  }, [isOpen, editingDiscountId, state.discounts, state.products, form]);

  const handleTypeChange = (type: string) => {
    setDiscountType(type as "bundle" | "percentage" | "fixed");
    
    // Reset the "with product" checkbox when switching discount types
    if (type !== 'fixed') {
      setShowWithProduct(false);
      form.setValue('withProduct', false);
    }
  };

  const handleWithProductChange = (checked: boolean) => {
    setShowWithProduct(checked);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const productId = parseInt(values.productId);
    
    let params: any = {};
    if (values.type === 'bundle') {
      params = {
        quantity: parseInt(values.bundleQuantity || "2"),
        price: parseFloat(values.bundlePrice || "0")
      };
    } else if (values.type === 'percentage') {
      params = {
        percentage: parseInt(values.percentageValue || "10")
      };
    } else if (values.type === 'fixed') {
      params = {
        amount: parseFloat(values.fixedAmount || "0")
      };
      
      if (values.withProduct && values.withProductId) {
        params.withProduct = parseInt(values.withProductId);
      }
    }

    const discountData = {
      name: values.name,
      type: values.type as Discount['type'],
      productId,
      params
    };

    if (isEditing && editingDiscountId) {
      editDiscount(editingDiscountId, discountData);
    } else {
      addDiscount(discountData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? t('addDiscountModalTitle') : t('addDiscountModalTitle')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('discountNameLabel')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('discountTypeLabel')}</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTypeChange(value);
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectProductPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bundle">{t('discountTypeBundle')}</SelectItem>
                      <SelectItem value="percentage">{t('discountTypePercentage')}</SelectItem>
                      <SelectItem value="fixed">{t('discountTypeFixed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Bundle Discount Fields */}
            {discountType === 'bundle' && (
              <>
                <FormField
                  control={form.control}
                  name="bundleQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('bundleQuantityLabel')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bundlePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('bundlePriceLabel')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" min="0" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Percentage Discount Fields */}
            {discountType === 'percentage' && (
              <FormField
                control={form.control}
                name="percentageValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('percentageValueLabel')}</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input {...field} type="number" min="1" max="100" className="w-full" />
                      </FormControl>
                      <span className="ml-2">%</span>
                    </div>
                  </FormItem>
                )}
              />
            )}

            {/* Fixed Amount Discount Fields */}
            {discountType === 'fixed' && (
              <>
                <FormField
                  control={form.control}
                  name="fixedAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('fixedAmountLabel')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" min="0" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="withProduct"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            handleWithProductChange(checked === true);
                          }} 
                        />
                      </FormControl>
                      <FormLabel className="mt-0">{t('withProductLabel')}</FormLabel>
                    </FormItem>
                  )}
                />

                {showWithProduct && (
                  <FormField
                    control={form.control}
                    name="withProductId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('withProductLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectProductPlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {state.products.map(product => (
                              <SelectItem key={product.id} value={product.id.toString()}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('applyToProductLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectProductPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {state.products.map(product => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t('cancelButton')}
              </Button>
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
                {isEditing ? t('saveDiscountButton') : t('saveDiscountButton')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
