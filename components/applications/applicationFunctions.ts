import { updateApplication } from '@/firebase/queries';
import { Application } from '@/models/models';

export const disable = async (application: Application) => {
  const disabledApp = await updateApplication(
    application,
    application?._id ?? '',
    true
  );
};
