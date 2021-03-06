import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { AppLayout } from '@/layouts/AppLayout';
import { ROUTES } from '@/lib/constants';
import { CustomPage } from '@/lib/types';

const DashboardPage: CustomPage = () => {
  return (
    <>
      <DashboardStats />
    </>
  );
};

DashboardPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;
DashboardPage.skeletonLoader = (
  <AppLayout isLoading>
    <DashboardStats isLoading />
  </AppLayout>
);
DashboardPage.redirectUnAuthenticatedTo = ROUTES.Login;

export default DashboardPage;
