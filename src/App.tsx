import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import ShareVideoPage from './pages/ShareVideo';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/share" element={<ShareVideoPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
