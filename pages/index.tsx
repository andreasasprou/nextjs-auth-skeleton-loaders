import { WebLayout } from '@/layouts/WebLayout';
import { CustomPage } from '@/lib/types';

const HomePage: CustomPage = () => (
  <>
    <p className="text-center">This is a fake marketing page.</p>
  </>
);

HomePage.getLayout = (page) => <WebLayout>{page}</WebLayout>;
HomePage.suppressFirstRenderFlicker = true;

export default HomePage;
