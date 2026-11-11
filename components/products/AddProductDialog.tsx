'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useAddProduct } from '@/hooks/products/useAddProduct';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UiDialog } from '../ui/UiDialog';
import { ProductStatus, ProductType } from '@prisma/client';
import { PRODUCT_STATUS_OPTIONS } from '@/lib/types/ProductStatus';
import { PRODUCT_TYPES_OPTIONS } from '@/lib/types/ProductType';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {  
  typeProduct: ProductType;
};

type FormValues = {
  name: string;
  description?: string | null;
  type: ProductType;
  status: ProductStatus;
  version?: string | null;
  repositoryUrl?: string | null;
  techStack?: string;
  readme?: string | null;
  launch_url?: string | null;
};

export default function AddProductDialog({ typeProduct }: Props) {
  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<{
    thumbnail?: File;
    demo?: File;
    userguide?: File;
  }>({});

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof files
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: {
      type: typeProduct,
      status: ProductStatus.RUNNING,
    },
  });

  const addProduct = useAddProduct(typeProduct);

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      techStack: data.techStack
        ? data.techStack.split(',').map((t) => t.trim())
        : [],
      thumbnail: files.thumbnail || null,
      demo: files.demo || null,
      userguide: files.userguide || null,
    };

    addProduct.mutate(payload, {
      onSuccess: () => {
        reset();
        setFiles({});
        setOpen(false);
      },
      onError: (err) => console.error('❌ Erreur création produit :', err),
    });
  };

  return (
    <UiDialog
      open={open}
      setOpen={setOpen}
      title="Ajouter un produit"
      description="Remplissez les informations ci-dessous pour ajouter un nouveau produit."
      icon={PlusCircle}
      height="xl"
      trigger={
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4"
      >
        {/* Première ligne */}
        <div className="space-y-2 md:col-span-2">
          <Label>
            Nom du produit <span className="text-red-500">*</span>
          </Label>
          <Input
            {...register('name', { required: true })}
            placeholder="Nom du produit"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>
            Type <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} required>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Type du produit" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_TYPES_OPTIONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label>
            Statut <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="status"
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} required>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {/* Fin première ligne */}

        {/* Deuxième ligne */}
        <div className="space-y-2 flex flex-col justify-end">
          <Label htmlFor="isPublic" className="text-black">Produit Public ?</Label>
          <Checkbox
            id="isPublic"
            {...register('isPublic')}
            className="h-4 w-4 border-black data-[state=checked]:bg-black"
          />
        </div>
        <div className="space-y-2">
          <Label>Version</Label>
          <Input {...register('version')} placeholder="Ex: 1.0.0" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>URL de lancement</Label>
          <Input {...register('launch_url')} placeholder="https://..." />
        </div>
        {/* Fin deuxième ligne */}

        {/* Description */}
        <div className="space-y-2 md:col-span-4">
          <Label>Description</Label>
          <Textarea {...register('description')} />
        </div>

        {/* Fichiers côte à côte */}
        {/* Image de couverture */}
        <div className="space-y-2">
          <Label>Image de couverture</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'thumbnail')}
          />
          {files.thumbnail && (
            <img
              src={URL.createObjectURL(files.thumbnail)}
              alt="preview"
              className="mt-2 w-32 rounded"
            />
          )}
        </div>

        {/* Flowchart */}
        <div className="space-y-2">
          <Label>Flowchart</Label>
          <Input
            type="file"
            accept="image/*,.svg"
            onChange={(e) => handleFileUpload(e, 'flowchart')}
          />
          {files.flowchart && (
            <img
              src={URL.createObjectURL(files.flowchart)}
              alt="flowchart"
              className="mt-2 w-32 rounded"
            />
          )}
        </div>

        {/* Vidéo démo */}
        <div className="space-y-2">
          <Label>Vidéo démo</Label>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'demo')}
          />
          {files.demo && (
            <video
              src={URL.createObjectURL(files.demo)}
              controls
              className="mt-2 w-full max-h-40 rounded"
            />
          )}
        </div>

        {/* Guide utilisateur */}
        <div className="space-y-2">
          <Label>Guide utilisateur</Label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.xlsx"
            onChange={(e) => handleFileUpload(e, 'userguide')}
          />
          {files.userguide && (
            <span className="block mt-2 text-xs text-muted-foreground">
              {files.userguide.name}
            </span>
          )}
        </div>

        {/* Stack Tech */}
        <div className="space-y-2 md:col-span-2">
          <Label>Stack Tech</Label>
          <Input
            {...register('techStack')}
            placeholder="Ex: Next.js, Prisma, Postgres"
          />
        </div>

        {/* Dépendances */}
        <div className="space-y-2 md:col-span-2">
          <Label>Dépendances</Label>
          <Input
            {...register('dependencies')}
            placeholder="Ex: Stripe, Sendgrid, etc."
          />
        </div>

        {/* ReadMe */}
        <div className="space-y-2 md:col-span-4">
          <Label>ReadMe</Label>
          <Textarea
            {...register('readme')}
            placeholder={`Exemple :\n- User: admin\n- Password: 1234\n- Lien GitHub...`}
          />
        </div>

        <Separator className="my-5 md:col-span-4" />

        <Button
          className="w-full flex items-center justify-center gap-2 md:col-span-4"
          type="submit"
          disabled={addProduct.isPending}
        >
          {addProduct.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {addProduct.isPending ? 'Création...' : 'Créer'}
        </Button>
      </form>
    </UiDialog>
  );
}
