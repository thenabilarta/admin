import { Routes, Route } from "react-router-dom";
import WrapperRoute from "./Routes/WrapperRoute";
import Chat from "./pages/Chat/Index";
import Dashboard from "./pages/Dashboard/Index";
import Profession from "./pages/Profession/Index";
import AddProfession from "./pages/AddProfession/index";
import ProfessionRequest from "./pages/ProfessionRequest/index";
import ProfessionRequestDetail from "./pages/ProfessionRequestDetail/index";
import ListProfession from "./pages/ListProfession/index";
import List from "./pages/List/Index";
import Request from "./pages/Request/Index";
import Report from "./pages/Report/index";
import ReportDetail from "./pages/ReportDetail/index";
import ProductRequest from "./pages/ProductRequest/index";
import ProductList from "./pages/ProductList/index";
import CategoriesList from "./pages/CategoriesList/index";
import ProductRequestDetail from "./pages/ProductRequestDetail";
import ManageOneApplicants from "./pages/ManageOneApplicants/Index";
import { Suspense } from "react";

const App: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route element={<WrapperRoute />}>
          <Route path="" element={<Dashboard />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/product/request" element={<ProductRequest />} />

          <Route
            path="/product/request/:id"
            element={<ProductRequestDetail />}
          />

          <Route path="/profession/list" element={<ListProfession />} />
          <Route path="/profession/add" element={<AddProfession />} />
          <Route path="/profession/request" element={<ProfessionRequest />} />
          <Route
            path="/profession/request/:id"
            element={<ProfessionRequestDetail />}
          />

          <Route path="/profession" element={<Profession />} />
          <Route path="/consultant/list" element={<List />} />
          <Route path="/consultant/request" element={<Request />} />
          <Route
            path="/consultant/request/d"
            element={<ManageOneApplicants />}
          />

          <Route path="/chat" element={<Chat />} />

          <Route path="/reports" element={<Report />} />
          <Route path="/report/:id" element={<ReportDetail />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
};

export default App;
