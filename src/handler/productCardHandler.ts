import { router } from '@/routes/Routes';

export const handleCardClick = (id: string) => {
  router.navigate(`/details/${id}`);
};
