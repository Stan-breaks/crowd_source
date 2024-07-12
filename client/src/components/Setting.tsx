import { Button } from "@/components/ui/button";
import { useState } from "react";
import AccountSetting from "./AccountSetting";
export default function Component() {
  const [accountSettings, setAccountSettings] = useState<boolean>(false);
  return (
    <>
            {accountSettings ? (<>
<div className=" ml-8 mt-8">
        <Button
          className="ml-auto"
          onClick={() => setAccountSettings(!accountSettings)}
        >
          back
        </Button>
      </div>

        <AccountSetting />
        </>
      ) : (
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-50">
                General
              </h2>
              <div className="space-y-4 rounded-md bg-white p-4 shadow dark:bg-gray-900 md:p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                      Account
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your account settings.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setAccountSettings(!accountSettings)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </section>
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-50">
                Notifications
              </h2>
              <div className="space-y-4 rounded-md bg-white p-4 shadow dark:bg-gray-900 md:p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your email notification preferences.
                    </p>
                  </div>

                  <Button variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                      Desktop Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications on your desktop.
                    </p>
                  </div>

                  <Button variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                      Mobile Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications on your mobile device.
                    </p>
                  </div>

                  <Button variant="outline">Manage</Button>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
