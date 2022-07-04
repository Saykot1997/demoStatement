import { BrowserRouter, Routes, Route, } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Formats from "./Pages/Formats";
import Laout from "./Components/Laout"
import Transactions from "./Pages/Transactions";
import Login from "./Pages/Login"
import IslamiBankStatement from "./Pages/SocialislamiBank/IslamiBankStatement"
import IslamiBankTransaction from "./Pages/SocialislamiBank/IslamicBankTran"
import IslamiBankCertificate from "./Pages/SocialislamiBank/IslamiBankCertificate"
import EBLBankTran from "./Pages/EBLBank/EBLBankTran"
import UCBBankTran from "./Pages/UCBBank/UCBBankTran"
import UCOBankTran from "./Pages/UCOBank/UCOBankTran"
import CanaraTransaction from "./Pages/CanaraBank/CanaraBankTran"
import EBLStatement from "./Pages/EBLBank/EBLStatement"
import UCBBankStatement from "./Pages/UCBBank/UCBBankStatement"
import UCOBankStatement from "./Pages/UCOBank/UCOBankStatement"
import CanaraBankStatement from "./Pages/CanaraBank/CanaraBankStatement"
import EBLBankSolvency from "./Pages/EBLBank/EBLBankSolvency"
import UCBbankCertificate from "./Pages/UCBBank/UCBbankCertificate"
import UCObankCertificate from "./Pages/UCOBank/UCOBankCertificate"
import CanarabankCertificate from "./Pages/CanaraBank/CanaraBankCertificate"


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/"
          element={<PrivateRoute>
            <Laout>
              <Formats />
            </Laout>
          </PrivateRoute>} />

        <Route path="/transactions"
          element={<PrivateRoute>
            <Laout>
              <Transactions />
            </Laout>
          </PrivateRoute>} />

        {/* transactions route */}
        <Route path="/transactions/islamic_bank"
          element={<PrivateRoute>
            <Laout>
              <IslamiBankTransaction />
            </Laout>
          </PrivateRoute>} />

        <Route path="/transactions/ebl_bank"
          element={<PrivateRoute>
            <Laout>
              <EBLBankTran />
            </Laout>
          </PrivateRoute>} />

        <Route path="/transactions/ucb_bank"
          element={<PrivateRoute>
            <Laout>
              <UCBBankTran />
            </Laout>
          </PrivateRoute>} />

        <Route path="/transactions/uco_bank"
          element={<PrivateRoute>
            <Laout>
              <UCOBankTran />
            </Laout>
          </PrivateRoute>} />
        <Route path="/transactions/canara_bank"
          element={<PrivateRoute>
            <Laout>
              <CanaraTransaction />
            </Laout>
          </PrivateRoute>} />

        {/* statement formate routes */}


        <Route path="/ebl_bank"
          element={<PrivateRoute>
            <EBLStatement />
          </PrivateRoute>} />

        <Route path="/islami_bank"
          element={<PrivateRoute>
            <IslamiBankStatement />
          </PrivateRoute>} />

        <Route path="/ucb_bank"
          element={<PrivateRoute>
            <UCBBankStatement />
          </PrivateRoute>} />

        <Route path="/uco_bank"
          element={<PrivateRoute>
            <UCOBankStatement />
          </PrivateRoute>} />

        <Route path="/canara_bank"
          element={<PrivateRoute>
            <CanaraBankStatement />
          </PrivateRoute>} />

        {/* cirtificate formate routes */}
        <Route path="/islami_bank_certificate"
          element={<PrivateRoute>
            <IslamiBankCertificate />
          </PrivateRoute>} />

        <Route path="/ebl_bank_solvency"
          element={<PrivateRoute>
            <EBLBankSolvency />
          </PrivateRoute>} />

        <Route path="/ucb_bank_solvency"
          element={<PrivateRoute>
            < UCBbankCertificate />
          </PrivateRoute>} />

        <Route path="/uco_bank_solvency"
          element={<PrivateRoute>
            < UCObankCertificate />
          </PrivateRoute>} />

        <Route path="/canara_bank_solvency"
          element={<PrivateRoute>
            <CanarabankCertificate />
          </PrivateRoute>} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;