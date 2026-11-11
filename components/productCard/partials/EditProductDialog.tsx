'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { UiDialog } from '@/components/ui/UiDialog';
import { useUpdateProduct } from '@/hooks/products/useUpdateProduct';
import { Product, ProductFormData, PRODUCT_TYPES } from '@/lib/types/Product';
import { ProductStatus, ProductType } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCT_STATUS_OPTIONS } from '@/lib/types/ProductStatus';
import { Checkbox } from '@/components/ui/checkbox';

type EditProductDialogProps = {
  product: Product;
  trigger: React.ReactNode;
};

export function EditProductDialog({
  product,
  trigger,
}: EditProductDialogProps) {
  const [openEdit, setOpenEdit] = useState(false);

  const [files, setFiles] = useState<{
    thumbnail?: File | null;
    flowchart?: File | null;
    demo?: File | null;
    userguide?: File | null;
  }>({
    thumbnail: null,
    flowchart: null,
    demo: null,
    userguide: null,
  });

  const [initialUrls, setInitialUrls] = useState<{
    thumbnail?: string;
    flowchart?: string;
    demo?: string;
    userguide?: string;
  }>({
    thumbnail: product?.thumbnail ?? '',
    flowchart: product?.flowchart ?? '',
    demo: product?.demo ?? '',
    userguide: product?.userguide ?? '',
  });

  const { register, handleSubmit, setValue } = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name ?? '',
      type: product?.type ?? '',
      status: product?.status ?? '',
      version: product?.version ?? '',
      description: product?.description ?? '',
      readme: product?.readme ?? '',
      launch_url: product?.launch_url ?? '',
      thumbnail: product?.thumbnail ?? '',
      flowchart: product?.flowchart ?? '',
      demo: product?.demo ?? '',
      userguide: product?.userguide ?? '',
      repositoryUrl: product?.repositoryUrl ?? '',
      thumbnail: product?.thumbnail ?? '',
      demo: product?.demo ?? '',
      flowchart: product?.flowchart ?? '',
      userguide: product?.userguide ?? '',
      techStack: product?.techStack ?? '',
      updatedBy: product?.updatedBy ?? '',
      isPublic: product?.isPublic ?? false,
    },
  });

  const updateProduct = useUpdateProduct(product.id);

  // ✅ upload vers ton API `/api/upload`
  const uploadFile = async (file: File, field: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('productId', product.id);
    formData.append('field', field);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Erreur d'upload du fichier ${field}`);
    }

    const data = await res.json();
    return data.url as string;
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof files
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const onSubmit = async (values: ProductFormData) => {
    try {
      const uploads: Record<string, string> = {};

      // Upload tous les fichiers sélectionnés
      for (const key of Object.keys(files) as (keyof typeof files)[]) {
        const file = files[key];
        if (file) {
          const uploadedUrl = await uploadFile(file, key);
          uploads[key] = uploadedUrl;
        }
      }

      const finalValues = { ...values, ...uploads };

      updateProduct.mutate(finalValues, {
        onSuccess: () => setOpenEdit(false),
      });
    } catch (err) {
      console.error('❌ Erreur upload produit :', err);
    }
  };

  return (
    <UiDialog
      open={openEdit}
      setOpen={setOpenEdit}
      title="Modification le produit"
      description="Modifier les informations du produit"
      icon={Pencil}
      height="xl"
      trigger={trigger}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4"
      >
        {/* Nom */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Nom du produit</Label>
          <Input id="name" {...register('name', { required: true })} />
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            defaultValue={product?.type}
            onValueChange={(val: ProductType) => setValue('type', val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir un type" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Statut */}
        <div className="space-y-2">
          <Label>Statut</Label>
          <Select
            defaultValue={product?.status}
            onValueChange={(val: ProductStatus) => setValue('status', val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir un Statut" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_STATUS_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Visibilité */}
        <div className="space-y-2 md:col-span-1 gap-4">
          <Label htmlFor="isPublic"> Produit Public ?</Label>
          <Checkbox
            id="isPublic"
            {...register('isPublic')}
            className="h-4 w-4"
          />
        </div>

        {/* Version */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="version">Version</Label>
          <Input id="version" {...register('version')} />
        </div>

        {/* URL de lancement */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="launch_url">URL de lancement</Label>
          <Input {...register('launch_url')} type="url" placeholder="URL" />
        </div>

        {/* URL repo */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="repositoryUrl">Repository URL</Label>
          <Input {...register('repositoryUrl')} type="url" />
        </div>

        {/* URL odcumentation */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="documentationUrl">Documentation URL</Label>
          <Input {...register('documentationUrl')} type="url" />
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-4">
          <Label htmlFor="description">Description</Label>
          <Textarea {...register('description')} placeholder="Description" />
        </div>

        <div className="md:col-span-4" />

        {/* Image de couverture */}
        <div className="space-y-2">
          <Label>Image de couverture</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'thumbnail')}
          />
          {(files.thumbnail || initialUrls.thumbnail) && (
            <img
              src={
                files.thumbnail
                  ? URL.createObjectURL(files.thumbnail)
                  : initialUrls.thumbnail
              }
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
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'flowchart')}
          />
          {(files.flowchart || initialUrls.flowchart) && (
            <img
              src={
                files.flowchart
                  ? URL.createObjectURL(files.flowchart)
                  : initialUrls.flowchart
              }
              alt="preview"
              className="mt-2 w-32 rounded"
            />
          )}
        </div>

        {/* Vidéo démo */}
        <div className="space-y-2">
          <Label>Vidéo de Démo</Label>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'demo')}
          />
          {(files.demo || initialUrls.demo) && (
            <video
              src={files.demo ? URL.createObjectURL(files.demo) : initialUrls.demo}
              controls
              className="mt-2 w-32 rounded"
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

          {files.userguide ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Fichier sélectionné : {files.userguide.name}
            </p>
          ) : initialUrls.userguide ? (
            <a
              href={initialUrls.userguide}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-blue-600 underline"
            >
              Voir le guide actuel
            </a>
          ) : null}
        </div>

        {/* Stack Tech */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="techStack">
            Stack Tech
            <span className="text-xs italic text-muted-foreground">
              (Sépare les technologies par des virgules)
            </span>
          </Label>
          <Input
            id="techStack"
            placeholder="Ex: React, Node.js, PostgreSQL"
            defaultValue={product?.techStack?.join(', ')}
            onChange={(e) =>
              setValue(
                'techStack',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        {/* Dependencies */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="dependencies">
            Dépendances/ Apps tiers
            <span className="text-xs italic text-muted-foreground">
              (Sépare les tags par des virgules)
            </span>
          </Label>
          <Input
            id="dependencies"
            placeholder="Ex: Amp-AIF, Robot X, App Etat Fianncier, ..."
            defaultValue={product?.dependencies?.join(', ')}
            onChange={(e) =>
              setValue(
                'dependencies',
                e.target.value
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        {/* ReadMe */}
        <div className="space-y-2 md:col-span-4">
          <Label htmlFor="readme">ReadME</Label>
          <Textarea
            {...register('readme')}
            placeholder="Instructions, identifiants..."
          />
        </div>

        <Separator className="my-3 md:col-span-4" />
        <Button
          className="w-full flex items-center justify-center gap-2 md:col-span-4"
          type="submit"
          disabled={updateProduct.isPending}
        >
          {updateProduct.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {updateProduct.isPending
            ? 'Enregistrement en cours...'
            : 'Enregistrer les modifications'}
        </Button>
      </form>
    </UiDialog>
  );
}

export default EditProductDialog;

