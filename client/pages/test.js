import Dashboard from "../components/dashboard-layout";
import Alert from "../components/alert";

import isAuthenticated from "../lib/isAuthenticated";
import redirect from "../lib/redirect";
import useUser from "../hooks/use-user";

import { useState } from "react";

const TestPage = () => {
  const { userData, loaded } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div>
      <Alert open={showAlert} handle={setShowAlert}>
        <div className="flex gap-6">
          <div className="p-6">
            <img
              className=" object-cover h-10 w-10"
              src="https://cdn.pulth.com/akilsagligi.jpg"
            />
          </div>
          <div>
            <p className="text-xl">Updated</p>
            <p className="text-base">Your email updated</p>
          </div>
        </div>
      </Alert>
      <button className="border" onClick={() => setShowAlert(true)}>
        Open
      </button>
    </div>
  );
};

TestPage.getLayout = (page) => {
  const { userData, loaded } = useUser();

  return (
    <Dashboard title="Test" username={userData.username}>
      {page}
    </Dashboard>
  );
};

TestPage.getInitialProps = async (ctx) => {
  const isAuth = await isAuthenticated(ctx);
  if (!isAuth) redirect("/login", ctx);

  return { isAuth };
};

export default TestPage;
