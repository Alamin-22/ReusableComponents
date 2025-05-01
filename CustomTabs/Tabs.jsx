"use client";
import { createContext, useContext, useState } from "react";

const TabsContext = createContext({ activeTab: null, setActiveTab: () => {} });

function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

// Tab list container
function List({ children }) {
  return (
    <div
      className="flex justify-center border-b border-gray-200 mb-4"
      role="tablist"
    >
      {children}
    </div>
  );
}

// Individual tab button
function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-300 focus:outline-none transition-colors${
        isActive ? " text-blue-600 border-blue-600" : ""
      }`}
    >
      {children}
    </button>
  );
}

// Panels container
function Panels({ children }) {
  return <div className="p-6 border">{children}</div>;
}

// Individual panel
function Panel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <div
      role="tabpanel"
      className={`transition-opacity duration-200${
        isActive ? " opacity-100 h-auto" : " opacity-0 h-0 overflow-hidden"
      }`}
    >
      {children}
    </div>
  );
}

// Assign subcomponents
Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panels = Panels;
Tabs.Panel = Panel;

export default Tabs;
