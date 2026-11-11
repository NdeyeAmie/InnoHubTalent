import { IdeaStatus } from '@prisma/client';

export const STATUS_IDEAS_OPTIONS: { value: IdeaStatus; label: string }[] =
  Object.values(IdeaStatus).map((value) => {
    let label: string;

    switch (value) {
      case 'PROPOSED':
        label = 'Proposée';
        break;
      case 'IN_REVIEW':
        label = 'En révision';
        break;
      case 'APPROVED':
        label = 'Approuvée';
        break;
      case 'REJECTED':
        label = 'Rejetée';
        break;
      case 'IN_PROGRESS':
        label = 'En cours';
        break;
      case 'DONE':
        label = 'Terminée';
        break;
      default:
        label = value;
    }

    return {
      value,
      label,
    };
  });
