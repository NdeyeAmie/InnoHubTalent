'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

type UserActivity = {
  action: string;
  type?: string;
  createdAt: string;
};

type UserActivitiesDialogProps = {
  userName: string;
  trigger: React.ReactNode;
  mock?: boolean;
};

export function UserActivitiesDialog({
  userName,
  trigger,
  mock,
}: UserActivitiesDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [activities, setActivities] = React.useState<UserActivity[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Fonction pour charger les activités (remplace par ton hook réel si besoin)
  const fetchActivities = async () => {
    setLoading(true);
    // Exemple d'appel API réel :
    // const res = await fetch(`/api/users/${userName}/activities`);
    // const data = await res.json();
    // setActivities(data);

    // Si tu veux garder le mock :
    setTimeout(() => {
      setActivities([
        {
          action: 'Connexion',
          type: 'AUTH',
          createdAt: '2024-06-01T10:00:00Z',
        },
        {
          action: "Ajout d'un produit",
          type: 'PRODUCT',
          createdAt: '2024-06-02T14:30:00Z',
        },
        {
          action: 'Modification du profil',
          type: 'PROFILE',
          createdAt: '2024-06-03T09:15:00Z',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  // Charge les activités dès l'ouverture du dialog
  React.useEffect(() => {
    if (open) {
      fetchActivities();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activités de&nbsp;
            <span className="font-bold text-primary">{userName}</span>
          </DialogTitle>
          <DialogDescription>
            Historique des actions récentes de cet utilisateur.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {loading && (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          )}
          {!loading && activities.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucune activité récente.
            </p>
          )}
          {activities.map((activity, idx) => (
            <div key={idx} className="border-b border-border py-2 text-sm">
              <div>
                <span className="font-semibold">{activity.action}</span>
                {activity.type && (
                  <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {activity.type}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(activity.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {/* Le bouton "Actualiser" recharge les activités */}
        <Button
          onClick={fetchActivities}
          className="mt-4 w-full"
          variant="outline"
        >
          Actualiser
        </Button>
      </DialogContent>
    </Dialog>
  );
}
